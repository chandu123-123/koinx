const { Schema, model, default: mongoose } = require("mongoose");


const CryptocurrencySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  current_price: { type: Number, required: true },
  market_cap: { type: Number, required: true },
  price_change_24h: { type: Number, required: true },
  last_updated: { type: Date, default: Date.now },
});

export const Cryptocurrency =
mongoose.models.Cryptocurrency || new mongoose.model('Cryptocurrency', CryptocurrencySchema);

