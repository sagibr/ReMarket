const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg",
  },
  startPrice: { type: Number, required: true },
  lastPrice: { type: Number },
  bids: { type: Number, default: 0 },
  startDate: { type: Date, default: new Date() },
  lastDate: { type: Date, required: true },
  winner: {
    name: { type: String },
    email: { type: String },
  },
});
const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
