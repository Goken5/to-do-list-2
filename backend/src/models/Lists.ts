import mongoose, { Document, Schema } from 'mongoose';

export interface IList extends Document {
    nome: string;
    descricao?: string;
    tarefas: Array<{
        texto: string;
        completed: boolean;
    }>;
    userEmail: string;
    createdAt: Date;
}

const ListSchema: Schema = new Schema({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true
    },
    descricao: {
        type: String,
        trim: true
    },
    tarefas: [{
        texto: {
            type: String,
            required: true
        },
        completed: {
            type: Boolean,
            default: false
        }
    }],
    userEmail: {
        type: String,
        required: [true, 'Email do usuário é obrigatório']
    }
}, {
    timestamps: true
});

export default mongoose.model<IList>('List', ListSchema);