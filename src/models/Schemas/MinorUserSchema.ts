import { Document, model, Model, models, Schema } from "mongoose";

interface IMinorUserSchema extends Document {
  idDiscord: string;
  birthday: string;
  lastAge: number;
}

const minorUserSchema = new Schema({
  idDiscord: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  lastAge: {
    type: Number,
    required: false,
  },
});

const MinorUserSchema: Model<IMinorUserSchema> =
  models.minorUser || model<IMinorUserSchema>("minorUser", minorUserSchema);

export { IMinorUserSchema, MinorUserSchema };
