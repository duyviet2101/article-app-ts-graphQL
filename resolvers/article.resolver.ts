import Article from "../models/article.model";
import Category from "../models/category.model";

export const resolversArticle = {
  Query: {
    getListArticle: async (_, args) => {
      const { 
        sortKey, 
        sortValue, 
        currentPage, 
        limitItems,
        filterKey,
        filterValue,
        keyword
      } = args;

      const find = {
        deleted: false
      }
      
      // sort
      const sort = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue;
      }
      // end sort
      
      // pagination
      const skip = (currentPage - 1) * limitItems;
      // end pagination

      // filter
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }
      // end filter

      // Search
      if (keyword) {
        find["$or"] = [
          {
            title: {
              $regex: keyword,
              $options: "i"
            }
          },
          {
            description: {
              $regex: keyword,
              $options: "i"
            }
          }
        ];
      }
      // end Search
      
      const articles = await Article.find(find).sort(sort).limit(limitItems).skip(skip);
      
      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;

      const article = await Article.findOne({
        _id: id,
        deleted: false
      });
      return article;
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
    })
  }
};