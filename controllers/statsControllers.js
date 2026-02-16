import Booking from "../models/bookingInfo.js";
import Room from "../models/room.js";

export const getHostStats = async (req, res) => {
  try {
    const { hostEmail } = req.params;

    if (!hostEmail) {
      return res.status(400).json({
        success: false,
        message: "Host email is required",
      });
    }

    // 1 Total Rooms Added By Host
    const totalRooms = await Room.countDocuments({
      "hostInfo.email": hostEmail,
    });

    // 2 Total Bookings + Total Revenue
    const bookingSummary = await Booking.aggregate([
      { $match: { hostEmail: hostEmail } },
      {
        $group: {
          _id: null,
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$price" },
        },
      },
    ]);

    const totalBookings =
      bookingSummary.length > 0 ? bookingSummary[0].totalBookings : 0;

    const totalRevenue =
      bookingSummary.length > 0 ? bookingSummary[0].totalRevenue : 0;

    // 3 Monthly Revenue (Bar Chart)
    const monthlyRevenue = await Booking.aggregate([
      { $match: { hostEmail: hostEmail } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$price" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    // 4 Booking Status Distribution (Pie Chart)
    const bookingStatus = await Booking.aggregate([
      { $match: { hostEmail: hostEmail } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      cards: {
        totalRooms,
        totalBookings,
        totalRevenue,
      },
      charts: {
        monthlyRevenue,
        bookingStatus,
      },
    });
  } catch (error) {
    console.error("Host Stats Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch host statistics",
    });
  }
};

export const getHostChartData = async (req, res) => {
  try {
    const { hostEmail } = req.params;

    if (!hostEmail) {
      return res.status(400).json({ message: "Host email is required" });
    }

    const aggregationResult = await Booking.aggregate([
      {
        $match: {
          hostEmail: hostEmail,
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          totalRevenue: { $sum: "$price" },
          totalBookings: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const monthlyRevenue = aggregationResult.map((item) => ({
      month: monthNames[item._id.month - 1],
      revenue: item.totalRevenue,
    }));

    const monthlyBookings = aggregationResult.map((item) => ({
      month: monthNames[item._id.month - 1],
      bookings: item.totalBookings,
    }));

    res.status(200).json({
      monthlyRevenue,
      monthlyBookings,
    });
  } catch (error) {
    console.error("Host Chart Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
