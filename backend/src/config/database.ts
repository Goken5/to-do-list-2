import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Goken5:DbzSuper2@todolistgoken5.xvkizpw.mongodb.net/?appName=TodoListGoken5');
    
    console.log('MongoDB conectado!');
  } catch (error) {
    console.error('Erro ao conectar MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;