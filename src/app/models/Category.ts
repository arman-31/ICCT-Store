import mongoose from "mongoose"

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

// Create slug from name before saving
categorySchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/ /g, "-")
  next()
})

export default mongoose.models.Category || mongoose.model("Category", categorySchema)

