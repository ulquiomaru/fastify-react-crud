import { Schema, model } from "mongoose";

const menuItemSchema = new Schema({
  id: String,
  name: String,
  price: Number,
});

const MenuItem = model("MenuItem", menuItemSchema);

export default { MenuItem };
