import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config(); // carrega o .env

const connectDB = async () => {
  const mongouri = process.env.MONGO_URI; // pega a chave mongouri do .env
  if (!mongouri) {
    console.error("mongouri não encontrado no env");
    process.exit(1);
  }
  try {
    await mongoose.connect(mongouri!);
    console.log('MongoDB conectado');
  } catch (error) {
    console.error('Erro ao conectar MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;