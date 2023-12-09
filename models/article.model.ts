import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: String,
  avatar: String,
  description: String,
  categoryId: String,
  deleted: Boolean
});

const Article = mongoose.model("Article", articleSchema, "articles");

export default Article;