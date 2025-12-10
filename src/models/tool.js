import { Schema, model } from 'mongoose';

const toolSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mainImage: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    technicalSpecs: {
      type: String,
      default: '',
      trim: true,
    },
    rentalConditions: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

toolSchema.index({ name: 'text', description: 'text' });

export const Tool = model('Tool', toolSchema);
