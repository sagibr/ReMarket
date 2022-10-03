const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  description: { type: String, required: true },
  images: { type: String },
  startPrice: { type: Number, required: true },
  lastPrice: { type: Number },
  bids: { type: Number, default: 0 },
  startDate: { type: Date, default: new Date() },
  lastDate: { type: Date, required: true },
  winner: {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
  },
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
