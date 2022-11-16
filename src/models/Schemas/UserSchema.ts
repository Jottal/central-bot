import { Document, model, Model, models, Schema } from "mongoose";

interface IUserSchema extends Document {
  idDiscord: string;
  verified: boolean;
  birthday: string;
  lastAge: number;
}

const userSchema = new Schema({
  idDiscord: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  birthday: {
    type: String,
    required: false,
  },
  lastAge: {
    type: Number,
    required: false,
  },
});

const UserSchema: Model<IUserSchema> =
  models.user || model<IUserSchema>("user", userSchema);

export { IUserSchema, UserSchema };
