import mongoose, { Document } from "mongoose";

export interface ISchedule extends Document {
  _id: number;
  user_id: number;
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

const scheduleSchema = new mongoose.Schema({
  user_id: { type: String, required: true, unique: true },
  monday: { type: String, required: false, default: null, unique: true },
  tuesday: { type: String, required: false, default: null, unique: true },
  wednesday: { type: String, required: false, default: null, unique: true },
  thursday: { type: String, required: false, default: null, unique: true },
  friday: { type: String, required: false, default: null, unique: true },
  saturday: { type: String, required: false, default: null, unique: true },
  sunday: { type: String, required: false, default: null, unique: true },
});

export const Schedule = mongoose.model<ISchedule>("Schedule", scheduleSchema);
