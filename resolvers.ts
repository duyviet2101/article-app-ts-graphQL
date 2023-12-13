import Article from "./models/article.model";
import Category from "./models/category.model";

export const resolvers = {
  Query: {
    getListArticle: async () => {
      const articles = await Article.find({
        deleted: false
      });
      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;

      const article = await Article.findOne({
        _id: id,
        deleted: false
      });
      return article;
    },
    getListCategory: async () => {
      const categories = await Category.find({
        deleted: false
      });
      return categories;
    },
    getCategory: async (_, args) => {
      const { id } = args;

      const category = await Category.findOne({
        _id: id,
        deleted: false
      });
      return category;
    }
  },
  Article: {
    category: async (article) => {
      const categoryId = article.categoryId;

      const category = await Category.findOne({
        _id: categoryId,
        deleted: false
      });

      return category;
    }
  },
  Mutation: {
    createArticle: (async (_, args) => {
      const { article } = args;

      const newArticle = await Article.create({
        ...article
      });

      return newArticle;
    }),
    deleteArticle: (async (_, args) => {
      const { id } = args;

      const newArticle = await Article.findOneAndUpdate({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      }, {
        new: false
      });
      return newArticle;
    }),
    updateArticle: (async (_, args) => {
      const { id, article } = args;

      const newArticle = await Article.findOneAndUpdate({
        _id: id
      }, {
        ...article
      }, {
        new: true
      });
      return newArticle;
    }),
    createCategory: (async (_, agrs) => {
      const { category } = agrs;
      const newCategory = await Category.create({
        ...category
      });
      return newCategory;
    }),
    updateCategory: (async (_, args) => {
      const {id, category} = args;
      const newCategory = await Category.findOneAndUpdate({
        _id: id
      }, {
        ...category
      }, {
        new: true
      });
      return newCategory;
    }),
    deleteCategory: (async (_, args) => {
      const { id } = args;
      const newCategory = await Category.findOneAndUpdate({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      }, {
        new: false
      });
      return newCategory;
    })
  }
};