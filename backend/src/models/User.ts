import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true
  },
  senha: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: 8
  }
}, {
  timestamps: true
});

UserSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.senha;
  return user;
};

export default mongoose.model('User', UserSchema);