import { useState } from "react";
import { toast } from 'react-toastify';
import { api } from "../services/ApiService";
import { Input, Button } from "./Input";

type ModalMode = "criar" | "ver";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    mode: ModalMode;
}

function Modal({ isOpen, onClose, children, mode }: ModalProps) {
    if (!isOpen) return null;

    const modalStyles = {
        criar: {
            header: "bg-blue-500",
            title: "text-blue-700",
            border: "border-blue-300"
        },
        ver: {
            header: "bg-blue-500", 
            title: "text-blue-700",
            border: "border-blue-300"
        }
    };

    const currentStyle = modalStyles[mode];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className={`bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 ${currentStyle.border}`}>
                <div className={`${currentStyle.header} rounded-t-2xl p-4`}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-white">
                            {mode === "criar" ? " Criar Nova Lista" : " Detalhes da Lista"}
                        </h2>
                        <button 
                            onClick={onClose}
                            className="text-white hover:text-gray-200 text-2xl font-bold hover:scale-110 transition-transform"
                        >
                            ✕
                        </button>
                    </div>
                </div>
                
                <div className="px-6 pb-6 pt-4">
                    {children}
                </div>
            </div>
        </div>
    );
}


function ConteudoCriarLista({ onClose }: { onClose: () => void }) {
    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [tarefa, setTarefa] = useState<string[]>([]);
    const [novaTarefa, setNovaTarefa] = useState("");
    const userEmail = localStorage.getItem("userEmail");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!nome.trim() || !userEmail) {
            toast.error("Nome da lista é obrigatório!");
            return;
        }
    
        try {
            const data = await api.post("http://localhost:8000/lists", {
                nome: nome.trim(),
                descricao: descricao.trim(),
                tarefas: tarefa,
                userEmail,
            });
            console.log(data);
            toast.success("Lista Criada!");
            
            setNome("");
            setDescricao("");
            setTarefa([]);
            setNovaTarefa("");
            onClose();
            
        } catch (error) {
            console.error("Erro ao criar lista:", error);
            toast.error("Erro ao criar lista!");
        }
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
        <div className="text-center">
            <h1 className="text-2xl sm:text-3xl text-blue-700 font-semibold mb-6">
                Crie sua Lista
            </h1>

            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                <Input 
                    type="text" 
                    placeholder="Nome da Lista (ex: Lista de Compras)" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <Input 
                    type="text" 
                    placeholder="Descrição da Lista" 
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)} 
                />
                
                <div className="flex w-full gap-2 items-center mt-2 flex-col sm:flex-row">
                    <Input 
                        type="text" 
                        placeholder="Digite uma nova tarefa..." 
                        value={novaTarefa} 
                        onChange={(e) => setNovaTarefa(e.target.value)}
                    />
                    <Button type="button" onClick={criarTarefa} className="bg-blue-600 hover:bg-blue-700">
                         Adicionar
                    </Button>
                </div>

                <div className="w-full mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                        📋 Tarefas Adicionadas ({tarefa.length})
                    </h3>
                    {tarefa.length === 0 ? (
                        <p className="text-gray-500 italic">Nenhuma tarefa adicionada ainda</p>
                    ) : (
                        <ul className="flex flex-col gap-2 mb-4 max-h-40 overflow-y-auto">
                            {tarefa.map((t, index) => (
                                <li key={index} className="flex justify-between items-center
                                    bg-blue-50 text-black p-3 rounded-2xl border border-blue-200">
                                    <span className="font-medium">{index + 1}. {t}</span>
                                    <button 
                                        type="button" 
                                        className="bg-red-500 text-white px-3 py-1 rounded-full font-bold hover:scale-110 transition-transform hover:cursor-pointer text-sm"
                                        onClick={() => deletarTarefa(index)}
                                    >
                                        X
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                
                <div className="flex gap-4 mt-4 flex-col sm:flex-row">
                    <Button type="button" onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
                        Cancelar
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Criar Lista
                    </Button>
                </div>
            </form>
        </div>
    );
}

function ConteudoVerLista({ lista, onClose }: { lista: any, onClose: () => void }) {
    return (
        <div className="text-center">
            <h1 className="text-2xl sm:text-3xl text-blue-700 font-semibold mb-6">
                 Detalhes da Lista
            </h1>

            <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
                    <h2 className="text-xl font-bold text-blue-800 mb-2">{lista.nome}</h2>
                    <p className="text-gray-600">{lista.descricao}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-700 mb-4">
                        📝 Tarefas ({lista.tarefas.length})
                    </h3>
                    
                    {lista.tarefas.length === 0 ? (
                        <p className="text-gray-500 italic">Nenhuma tarefa nesta lista</p>
                    ) : (
                        <ul className="space-y-3 text-left">
                            {lista.tarefas.map((tarefa: string, index: number) => (
                                <li key={index} className="flex items-center gap-3 py-2 border-b border-gray-200">
                                    <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                        {index + 1}
                                    </span>
                                    <span className="text-gray-700">{tarefa}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex gap-4 mt-6 flex-col sm:flex-row">
                    <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
                        Voltar
                    </Button>
                </div>
            </div>
        </div>
    );
}

// COMPONENTE PRINCIPAL - VIEWLIST
export function ViewList() { 
    interface Lista {
        _id: string;
        nome: string;
        descricao: string;
        tarefas: string[];
        userEmail: string;
    }

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");
    const [listas, setListas] = useState<Lista[]>([]);

    const [modalListaAberto, setModalListaAberto] = useState(false);
    const [modalCriarAberto, setModalCriarAberto] = useState(false);
    const [listaSelecionada, setListaSelecionada] = useState<Lista | null>(null);

    const CarregarListas = async () => {
        try {
            const response = await api.get(`http://localhost:8000/lists?userEmail=${userEmail}`);
            console.log("Listas carregadas:", response.data);
            setListas(response.data);
        } catch (error) {
            console.error("Erro ao carregar listas:", error);
            toast.error("Erro ao carregar listas!");
        }
    }

    const DeletarLista = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        
        try {
            await api.delete(`http://localhost:8000/lists/${id}`);
            setListas(listas.filter(l => l._id !== id));
            toast.success("Lista deletada!");
        } catch (error) {
            console.error("Erro ao deletar lista:", error);
            toast.error("Erro ao deletar lista!");
        }
    }

    const abrirModalLista = (lista: Lista) => {
        setListaSelecionada(lista);
        setModalListaAberto(true);
    }

    const abrirModalCriar = () => {
        setModalCriarAberto(true);
    }

    const fecharModalLista = () => {
        setModalListaAberto(false);
        setListaSelecionada(null);
    }

    const fecharModalCriar = () => {
        setModalCriarAberto(false);
    }

    return(
        <div className="flex flex-col items-center text-center border-blue-600 border-2 bg-blue-300 sm:w-[60vw] w-[90vw] sm:min-h-[70vh] min-h-[50vh] rounded-3xl p-6 gap-6 mt-5">
            <h1 className="text-4xl text-white font-semibold">Bem-vindo às suas Listas, {userName}!</h1>
            
            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={CarregarListas}>Carregar Listas</Button>
                <Button onClick={abrirModalCriar} className="bg-blue-600 hover:bg-blue-700">
                    Criar Nova Lista
                </Button>
            </div>

            <div className="flex flex-col gap-4 w-full">
                {listas.length === 0 ? (
                    <div className="bg-white p-8 rounded-3xl text-gray-500">
                        📝 Nenhuma lista encontrada. Crie sua primeira lista!
                    </div>
                ) : (
                    listas.map((lista) => (
                        <div 
                            key={lista._id} 
                            className="flex flex-col xl:flex-row justify-between items-start bg-white p-5 rounded-3xl border border-black transition-all hover:scale-105 shadow-2xl duration-300 cursor-pointer"
                            onClick={() => abrirModalLista(lista)}
                        >
                            <div className="flex flex-col w-full xl:w-3/4 gap-2">
                                <h2 className="font-bold text-xl sm:text-2xl">{lista.nome}</h2>
                                <p className="text-gray-700">{lista.descricao}</p>
                                <p className="text-sm text-gray-500">
                                    📋 {lista.tarefas.length} tarefa(s) - Clique para ver detalhes
                                </p>
                            </div>

                            <div className="flex flex-col gap-2 mt-4 xl:mt-0">
                                <button 
                                    className="bg-red-500 text-white px-3 py-1 rounded-full font-bold hover:scale-110 hover:bg-red-600 transition-all hover:cursor-pointer hover:shadow-2xl shadow-2xl hover:shadow-black border-black border"
                                    onClick={(e) => DeletarLista(lista._id, e)}
                                >
                                    X
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* MODAL PARA VER DETALHES DA LISTA */}
            <Modal 
                isOpen={modalListaAberto} 
                onClose={fecharModalLista}
                mode="ver"
            >
                {listaSelecionada && (
                    <ConteudoVerLista 
                        lista={listaSelecionada} 
                        onClose={fecharModalLista} 
                    />
                )}
            </Modal>

            {/* MODAL PARA CRIAR NOVA LISTA */}
            <Modal 
                isOpen={modalCriarAberto} 
                onClose={fecharModalCriar}
                mode="criar"
            >
                <ConteudoCriarLista onClose={fecharModalCriar} />
            </Modal>
        </div>
    );
}