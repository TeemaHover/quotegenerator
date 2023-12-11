// models/QuoteModel.ts
import mongoose, { Document, Schema } from 'mongoose';

interface Quote {
  content: string;
  author: string;
  image: string;
  tags: string[]; // New field for tags
}

export interface QuoteDocument extends Quote, Document {}

const QuoteSchema = new Schema<QuoteDocument>({
  content: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] }, // Array of strings for tags
});

const QuoteModel = mongoose.model<QuoteDocument>('Quotes', QuoteSchema);

export default QuoteModel;
