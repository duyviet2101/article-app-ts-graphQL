import Category from "../models/category.model";

export const resolversCategory = {
  Query: {
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
  Mutation: {
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