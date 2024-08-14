import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/moodRelaxDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos MongoDB");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos:", error);
    process.exit(1);
  }
};

export default connectDB;
