import mongoose from "mongoose"

const sizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL", "XXL", "One Size"],
  },
  stock: {
    type: Number,
    required: true,
    min: [0, "Stock cannot be negative"],
  },
})

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        type: String,
        required: [true, "At least one product image is required"],
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product category is required"],
    },
    sizes: [sizeSchema],
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    totalStock: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

// Create slug from name before saving
productSchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/ /g, "-")
  // Calculate total stock
  this.totalStock = this.sizes.reduce((acc, size) => acc + size.stock, 0)
  next()
})

export default mongoose.models.Product || mongoose.model("Product", productSchema)

