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

const ListSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    descricao: {
        type: String,
        default: ""
    },
    tarefas: [{
        type: String
    }],
    userEmail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("List", ListSchema);
