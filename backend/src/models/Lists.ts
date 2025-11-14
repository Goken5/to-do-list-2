import mongoose, { Document, Schema } from 'mongoose';

export interface IList extends Document {
    nome: string;
    descricao?: string;
    tarefas: Array<{
        texto: string;
        concluida: boolean;
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
        texto: {
            type: String,
            required: true
        },
        concluida: {
            type: Boolean,
            default: false
        }
    }],
    userEmail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("List", ListSchema);
