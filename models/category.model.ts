import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: String,
  avatar: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
}, {
  timestamps: true
});

const Category = mongoose.model("category", categorySchema, "categories");

export default Category;