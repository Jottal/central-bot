import { Document, model, Model, models, Schema } from "mongoose";

interface IStaffSchema extends Document {
  idDiscord: string;
  name: string;
  password: string;
  sector: string;
}

const staffSchema = new Schema({
  idDiscord: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sector: {
    type: String,
    required: false,
  },
});

const StaffSchema: Model<IStaffSchema> =
  models.staff || model<IStaffSchema>("staff", staffSchema);

export { IStaffSchema, StaffSchema };
