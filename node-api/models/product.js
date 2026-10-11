import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      unique: true,
      lowercase: true
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10
    },
     category: {
      type: String,
      required: true,
      trim: true,
      enum: ["food", "electronics", "clothing", "cars"]
    },
    stock: {
      type: Number,
      min: 0,
      required: true,
      validate: {
        validator: (value) => Number.isInteger(value),
        message: "stock must be a non-negative integer"
      }
    }
  },
  {
    timestamps:true
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;