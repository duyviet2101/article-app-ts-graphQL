import Article from "./models/article.model";

export const resolvers = {
  Query: {
    hello: () => {
      return "Hello world!";
    },
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
    })
  }
};