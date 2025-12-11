import { Schema, model } from 'mongoose';

const toolSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    images: {
      type: String,
    },
    rating: {
      type: Number,
    },
    specifications: {
      type: Object,
    },
    rentalTerms: {
      type: String,
      trim: true,
    },
    bookedDates: {
      type: [String],
    },
    feedbacks: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Feedback' }],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

toolSchema.index(
  { name: 'text', description: 'text' },
  {
    name: 'ToolTextIndex',
    weights: { name: 10, description: 5 },
  },
);

export const Tool = model('Tool', toolSchema);
