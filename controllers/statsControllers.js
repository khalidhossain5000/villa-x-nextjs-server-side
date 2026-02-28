import User from "../models/auth.js";
import Booking from "../models/bookingInfo.js";
import Room from "../models/room.js";
import RoomCancelRequest from "../models/roomCancelRequest.js"
import BookingInfo from "../models/bookingInfo.js"
// Categories color map
const categoryColors = {
  Beach: "#facc15",
  Mountain: "#22d3ee",
  Modern: "#10b981",
  Countryside: "#a855f7",
  Pools: "#3b82f6",
  Islands: "#f97316",
  Lake: "#0ea5e9",
  Skiing: "#f43f5e",
  Castles: "#8b5cf6",
  Caves: "#6366f1",
  Camping: "#16a34a",
  Arctic: "#38bdf8",
  Desert: "#fbbf24",
  Barns: "#f87171",
  Lux: "#eab308",
}
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


// admin stats api are below

export const getAdminStatsData = async (req, res) => {
  try {
    const { adminEmail } = req.params;

    if (!adminEmail) {
      return res.status(400).json({ message: "Admin email is required" });
    }

    // Total Users
    const totalUsers = await User.countDocuments({});

    // Total Rooms
    const totalRooms = await Room.countDocuments({});

    //  Role-based users (Pie chart)
    const roleAggregation = await User.aggregate([
      {
        $group: {
          _id: "$userRole",
          count: { $sum: 1 },
        },
      },
    ]);

    const roleChartData = roleAggregation.map(item => ({
      role: item._id,
      users: item.count,
      fill: item._id === "Admin" ? "#310cef" :
            item._id === "Host" ? "#7e0cbb" :
            "#10002e", // Guest or other
    }));

    // 4 Room Category distribution (Pie chart)
    const categoryAggregation = await Room.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const roomCategoryChartData = categoryAggregation.map(item => ({
      category: item._id,
      rooms: item.count,
      fill: categoryColors[item._id] || "#9ca3af" // default gray if not in map
    }));

    // Response
    res.status(200).json({
      totalUsers,
      totalRooms,
      roleChartData,
      roomCategoryChartData,
    });

  } catch (error) {
    console.error("Admin Stats API Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




//guest user stats api is here

export const getGuestStatsData = async (req, res) => {
  try {
    const guestEmail = req.params.guestEmail;

    // 1. My Bookings
    const totalBookings = await BookingInfo.countDocuments({ "guest.email": guestEmail });

    // 2. Room Cancel Requests
    const totalCancelRequests = await RoomCancelRequest.countDocuments({ "requestedByInfo.email": guestEmail });

    // 3. Total Spent
    const bookings = await BookingInfo.find({ "guest.email": guestEmail });
    const totalSpent = bookings.reduce((sum, booking) => sum + booking.price, 0);

    res.status(200).json({
      myBookings: totalBookings,
      roomCancelRequests: totalCancelRequests,
      totalSpent: totalSpent
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};