import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    keywords: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const category = model('category', categorySchema);

export default category;
