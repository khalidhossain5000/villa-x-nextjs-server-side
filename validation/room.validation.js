import { z } from "zod";

export const roomSchema = z.object({
  location: z
    .string()
    .nonempty({ message: "Location is required" }),
  category: z
    .string()
    .nonempty({ message: "Category is required" }),
  title: z
    .string()
    .nonempty({ message: "Title is required" }),
  
  price: z
    .coerce.number({ invalid_type_error: "Price must be a number" })
    .positive({ message: "Price must be a positive number" }),
  total_guest: z
    .coerce.number({ invalid_type_error: "Total guest must be a number" })
    .positive({ message: "Total guest must be a positive number" }),
  bedrooms: z
    .coerce.number({ invalid_type_error: "Bedrooms must be a number" })
    .positive({ message: "Bedrooms must be a positive number" }),
  bathrooms: z
    .coerce.number({ invalid_type_error: "Bathrooms must be a number" })
    .positive({ message: "Bathrooms must be a positive number" }),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" }),
 
  thumbnailImage: z
    .string()
    .url({ message: "Invalid thumbnail image URL" }),

   roomImages: z
    .array(
      z.string().url({ message: "Invalid room image URL" })
    )
    .optional() // or remove optional if required
    .default([]),
  from: z
    .string({ required_error: "Start date is required" }),
  to: z
    .string({ required_error: "End date is required" }),

 
});
