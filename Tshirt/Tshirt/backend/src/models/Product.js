// src/models/Product.js
import mongoose from "mongoose";
// import Category from "./Category";
// import Vendor from "./Vendor";
const productSchema = new mongoose.Schema(
  {
    // 1. Identification (Required)
    name: { type: String, required: true, trim: true }, // Required
    slug: { type: String, unique: false, trim: true },   // Optional
    sku: { type: String, unique: true, sparse: true },  // Optional
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true }, // Required

    // 2. Descriptions
    short_description: { type: String, maxlength: 500 }, // Optional
    description: { type: String },                       // Optional
    specifications: { type: mongoose.Schema.Types.Mixed }, // Optional (JSON object)

    // 3. Pricing (Required)
    price: { type: Number, required: true },     // Required
    sale_price: { type: Number },                // Optional
    currency: { type: String, default: "USD" },  // Optional

    // 4. Inventory & Stock (Required)
    stock_quantity: { type: Number, required: true, default: 0 }, // Required
    stock_status: { 
      type: String, 
      enum: ["in_stock", "out_of_stock", "preorder"], 
      default: "in_stock" 
    },
    
    // T-Shirt Specific Fields
    sizes: { 
      type: [String], 
      enum: ["XS", "S", "M", "L", "XL", "XXL"], 
      required: true 
    },
    colors: { 
      type: [String], 
      required: true 
    },
    material: { type: String, default: "100% Cotton" },
    fit: { 
      type: String, 
      enum: ["Regular", "Slim", "Oversized", "Fitted"], 
      default: "Regular" 
    },
    
    weight: { type: Number },  // Optional (kg)
    length: { type: Number },  // Optional (cm)
    width: { type: Number },   // Optional
    height: { type: Number },  // Optional

    // 5. Media (Required for UI)
    image_url: { type: String, required: true }, // Required
    gallery_images: { type: [String] },          // Optional
    video_url: { type: String },                 // Optional

    // 6. SEO & Marketing
    meta_title: { type: String }, 
    meta_description: { type: String },
    tags: { type: [String] },
    is_featured: { type: Boolean, default: false },

    // 7. Vendor / Brand
    brand: { type: String },
    vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },

    // 8. Ratings & Reviews
    average_rating: { type: Number, default: 0.0 },
    review_count: { type: Number, default: 0 },

    // 9. Shipping & Delivery
    shipping_class: { type: String },
    delivery_time: { type: String },

    // 10. Status & Timestamps
    status: { type: String, enum: ["active", "inactive", "draft"], default: "active" }
  },
  { timestamps: true } // Automatically manages createdAt & updatedAt
);

export default mongoose.model("Product", productSchema);
