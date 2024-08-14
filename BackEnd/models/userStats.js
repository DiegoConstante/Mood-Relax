import mongoose from "mongoose";

const UserStatsSchema = new mongoose.Schema({
  email: String,
  edad: Number,
  pais: String,
  fechaRegistro: { type: Date, default: Date.now },
});

const UserStats = mongoose.model("UserStats", UserStatsSchema);

export default UserStats;
