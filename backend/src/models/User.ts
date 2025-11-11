import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

interface IUserMethods {
  compareSenha(senhaDigitada: string): Promise<boolean>;
}

// Interface pq o Typescript me fudeu
interface IUser extends mongoose.Document {
  nome: string;
  email: string;
  senha: string;
  compareSenha(senhaDigitada: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  nome: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('senha')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.senha = await bcrypt.hash(this.senha, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.compareSenha = async function(senhaDigitada: string): Promise<boolean> {
  return await bcrypt.compare(senhaDigitada, this.senha);
};

export default mongoose.model<IUser>('User', userSchema);