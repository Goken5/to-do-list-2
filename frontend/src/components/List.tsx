import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { Input, Button } from "./Input";

interface ListDivProps {
    CreateList: () => void;
}
export function ListDiv({ CreateList } : ListDivProps){
    const navigate = useNavigate();

    return(
        <div className="flex flex-col text-center justify-center items-center
        border-blue-600 border-2 bg-blue-300
        w-[90vw] max-w-[700px] rounded-3xl p-6 mt-6 shadow-lg shadow-black/40">
                
            <h1 className="text-3xl sm:text-4xl text-white font-semibold mb-6">
                Sobre suas Listas
            </h1>

            <div className="flex flex-col gap-3 w-full items-center">
                <Button onClick={CreateList}>Criar uma nova Lista</Button>
                <Button onClick={() => navigate("/lists")}>Visualizar suas Listas</Button>
            </div>
        </div>
    )
}

export function CreateListDiv() {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tarefa, setTarefa] = useState<string[]>([]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const userEmail = localStorage.getItem("userEmail");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await axios.post("http://localhost:8000/lists", {
            id: uuidv4(),
            nome,
            descricao,
            tarefas: tarefa,
            userEmail,
        });
        console.log(data);
    }

    const criarTarefa = () => {
        if (novaTarefa.trim() === "") return;
        setTarefa([...tarefa, novaTarefa]);
        setNovaTarefa("");
    }

    const deletarTarefa = (index: number) => {
        setTarefa(tarefa.filter((_, i) => i !== index));
    }

    return (
        <div className="flex flex-col items-center w-[90vw] max-w-[700px] mt-6 bg-blue-300
            border-2 border-blue-600 rounded-3xl p-6
            shadow-lg shadow-black/40">

            <h1 className="text-2xl sm:text-3xl text-white font-semibold mb-6">
                Crie sua Lista
            </h1>

            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="Nome da Lista (ex: lista de tarefas)" 
                    onChange={(e) => setNome(e.target.value)}
                />
                <Input 
                    type="text" 
                    placeholder="Descrição da Lista" 
                    onChange={(e) => setDescricao(e.target.value)} 
                />
                <div className="flex w-full gap-2 items-center mt-2 flex-col xl:flex-row">
                    <Input 
                        type="text" 
                        placeholder="Nova Tarefa" 
                        value={novaTarefa} 
                        onChange={(e) => setNovaTarefa(e.target.value)}
                    />
                    <Button type="button" onClick={criarTarefa}>Adicionar</Button>
                </div>

                <ul className="w-full mt-4 flex flex-col gap-2 mb-4">
                    {tarefa.map((t, index) => (
                        <li key={index} className="flex justify-between items-center
                            bg-white text-black p-3 rounded-2xl border border-black shadow-md
                            hover:shadow-xl transition-shadow duration-300">
                            <span className="font-medium">{index + 1}: {t}</span>
                            <button 
                                type="button" 
                                className="bg-red-500 text-white px-3 py-1 rounded-full font-bold hover:scale-110 transition-transform hover:cursor-pointer"
                                onClick={() => deletarTarefa(index)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>

                <Button type="submit">Criar Lista</Button>
            </form>
        </div>
    )
}



export function ViewList(){ 
    interface Lista {
        id: string;
        nome: string;
        descricao: string;
        tarefas: string[];
        userEmail: string;
    }

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const [listas, setListas] = useState<Lista[]>([]);

    const CarregarListas = async () => {
        const data = await axios.get(`http://localhost:8000/lists?userEmail=${userEmail}`);
        setListas(data.data);
    }
    const DeletarLista = async (id: string) => {
        await axios.delete(`http://localhost:8000/lists/${id}`)
        setListas(listas.filter(l => l.id !== id));
    }

    return(
        <div className="flex flex-col text-center border-blue-600 border-2 bg-blue-300 sm:w-[60vw] sm:min-h-[70vh] w-[90vw] min-h-[50vh] rounded-3xl items-center">
            <h1 className="text-4xl text-white font-semibold m-15">Bem-vindo às suas Listas {userName}!</h1>
            <Button onClick={CarregarListas}> Carregar Listas </Button>
            <div className="flex flex-col gap-4 w-full mt-4">
                {listas.map((lista) => (
                    <div key={lista.id} className="flex flex-col xl:flex-row justify-between items-start bg-white p-4 rounded-2xl border border-black shadow-md hover:shadow-xl transition-shadow duration-300">
                        <div className="flex flex-col gap-2">
                            <h2 className="font-bold text-lg">{lista.nome}</h2>
                            <p>{lista.descricao}</p>
                            <ul className="list-disc list-inside mt-2">
                                {lista.tarefas.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex gap-2 mt-2 xl:mt-0">
                            <button 
                                className="bg-red-500 text-white px-3 py-1 rounded-full font-bold hover:scale-110 transition-transform hover:cursor-pointer"
                                onClick={() => DeletarLista(lista.id)}> X </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
