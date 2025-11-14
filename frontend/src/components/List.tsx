import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { api } from "../services/ApiService";
import { Input, Button } from "./Input";

type ModalMode = "criar" | "ver" | "editar";

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
            header: "bg-gradient-to-r from-blue-600 to-indigo-600",
            title: "text-white",
            border: "border-blue-200 shadow-2xl",
            gradient: "from-blue-50 to-indigo-50"
        },
        ver: {
            header: "bg-gradient-to-r from-emerald-500 to-teal-600",
            title: "text-white",
            border: "border-emerald-200 shadow-2xl",
            gradient: "from-emerald-50 to-teal-50"
        },
        editar: {
            header: "bg-gradient-to-r from-cyan-500 to-cyan-700",
            title: "text-white",
            border: "border-cyan-200 shadow-2xl",
            gradient: "from-cyan-50 to-cyan-100"
        }
    };

    const currentStyle = modalStyles[mode];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`bg-linear-to-br ${currentStyle.gradient} rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 ${currentStyle.border} transform transition-all duration-300 scale-95 hover:scale-100`}>
                <div className={`${currentStyle.header} rounded-t-2xl p-6 shadow-lg`}>
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-white drop-shadow-md">
                            {mode === "criar" ? "Criar Nova Lista" : mode === "ver" ? "Detalhes da Lista" : "Editar Lista"}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-white hover:text-gray-200 text-2xl font-bold hover:scale-110 transition-transform duration-200 hover:cursor-pointer bg-linear-to-r from-red-700 to-pink-600 p-5 bg-opacity-20 w-8 h-8 rounded-full flex items-center justify-center"
                        >
                            X
                        </button>
                    </div>
                </div>

                <div className="px-8 pb-8 pt-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

function ConteudoCriarLista({ onClose, onListaCriada }: { onClose: () => void, onListaCriada?: () => void }) {
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
            await api.post("/lists", {
                nome: nome.trim(),
                descricao: descricao.trim(),
                tarefas: tarefa,
                userEmail,
            });

            toast.success("🎉 Lista Criada com Sucesso!");

            setNome("");
            setDescricao("");
            setTarefa([]);
            setNovaTarefa("");

            //Faz Callback pra atualizar as listas
            if (onListaCriada) {
                onListaCriada();
            }

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
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-8">
                Crie sua Lista
            </h1>

            <form className="flex flex-col items-center w-full space-y-6" onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Nome da Lista (ex: Lista de Compras)"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />
                <Input
                    type="text"
                    placeholder="Descrição da Lista"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                />

                <div className="flex w-full gap-3 items-center mt-4 flex-col sm:flex-row">
                    <Input
                        type="text"
                        placeholder="Digite uma nova tarefa..."
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        className="border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                    />
                    <Button
                        type="button"
                        onClick={criarTarefa}
                        className="bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Adicionar
                    </Button>
                </div>

                <div className="w-full mt-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4 bg-blue-50 py-2 rounded-xl border border-blue-200">
                        📋 Tarefas Adicionadas ({tarefa.length})
                    </h3>
                    {tarefa.length === 0 ? (
                        <p className="text-gray-500 italic py-4 bg-gray-50 rounded-xl border border-gray-200">
                            Nenhuma tarefa adicionada ainda
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-3 mb-6 max-h-48 overflow-y-auto p-2">
                            {tarefa.map((t, index) => (
                                <li key={index} className="flex justify-between items-center
                                    bg-linear-to-r from-blue-50 to-indigo-50 text-gray-800 p-4 rounded-2xl border-2 border-blue-100 shadow-sm hover:shadow-md transition-all duration-200">
                                    <span className="font-medium text-lg">{"•"} {t}</span>
                                    <button
                                        type="button"
                                        className="bg-linear-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold hover:scale-105 transform transition-all duration-200 hover:shadow-lg cursor-pointer text-sm shadow-md"
                                        onClick={() => deletarTarefa(index)}
                                    >
                                        ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="flex gap-4 mt-8 flex-col sm:flex-row">
                    <Button
                        type="button"
                        onClick={onClose}
                        className="bg-linear-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        className="bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        Criar Lista
                    </Button>
                </div>
            </form>
        </div>
    );
}

function ConteudoVerLista({ lista, onClose, onListaAtualizada }: {
    lista: any,
    onClose: () => void,
    onListaAtualizada?: (listaAtualizada: any) => void
}) {
    const [tarefasLocais, setTarefasLocais] = useState(lista.tarefas);

    const toggleTarefa = async (index: number) => {
        try {
            const tarefasAtualizadas = tarefasLocais.map((t: any, i: number) => {
                if (i === index) {
                    if (typeof t === 'object' && t.texto) {
                        return { ...t, concluida: !t.concluida };
                    }
                    return { texto: t, concluida: true };
                }
                if (typeof t === 'string') {
                    return { texto: t, concluida: false };
                }
                return t;
            });

            setTarefasLocais(tarefasAtualizadas);

            const response = await api.put(`/lists/${lista._id}`, {
                nome: lista.nome,
                descricao: lista.descricao,
                tarefas: tarefasAtualizadas
            });

            //Atualiza a lista no componente pai
            if (onListaAtualizada) {
                onListaAtualizada(response.data);
            }

            toast.success("Tarefa salva!");
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            toast.error("Erro ao salvar tarefa");
            setTarefasLocais(lista.tarefas);
        }
    };

    const handleClose = () => {
        onClose();
    };

    const getTarefaInfo = (tarefa: any) => {
        if (typeof tarefa === 'object' && tarefa.texto) {
            return {
                texto: tarefa.texto,
                concluida: tarefa.concluida || false
            };
        }
        return {
            texto: tarefa,
            concluida: false
        };
    };

    return (
        <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-8">
                Detalhes da Lista
            </h1>

            <div className="space-y-8">
                <div className="bg-linear-to-r from-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-lg">
                    <h2 className="text-2xl font-bold text-emerald-800 mb-3">{lista.nome}</h2>
                    <p className="text-gray-700 text-lg">{lista.descricao}</p>
                </div>

                <div className="bg-linear-to-br from-white to-gray-50 p-6 rounded-2xl border-2 border-emerald-200 shadow-lg">
                    <h3 className="text-xl font-semibold text-emerald-700 mb-6 bg-emerald-50 py-3 rounded-xl border border-emerald-200">
                        📝 Tarefas ({tarefasLocais.length})
                    </h3>

                    {tarefasLocais.length === 0 ? (
                        <p className="text-gray-500 italic py-6 bg-gray-50 rounded-xl border border-gray-200">
                            Nenhuma tarefa nesta lista
                        </p>
                    ) : (
                        <ul className="space-y-4 text-left">
                            {tarefasLocais.map((tarefa: any, index: number) => {
                                const tarefaInfo = getTarefaInfo(tarefa);

                                return (
                                    <li key={index} className="flex items-center gap-4 py-3 px-4 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md transition-all duration-200 group">
                                        <button
                                            onClick={() => toggleTarefa(index)}
                                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${tarefaInfo.concluida
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : 'border-gray-300 hover:border-green-400'
                                                }`}
                                        >
                                            {tarefaInfo.concluida && '✓'}
                                        </button>

                                        <span className={`text-lg font-medium transition-all duration-200 ${tarefaInfo.concluida
                                            ? 'line-through text-gray-500'
                                            : 'text-gray-800'
                                            }`}>
                                            {tarefaInfo.texto}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="flex gap-4 mt-8 flex-col sm:flex-row">
                    <Button
                        onClick={handleClose}
                        className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                    >
                        ← Voltar
                    </Button>
                </div>
            </div>
        </div>
    );
}

function ConteudoEditarLista({ lista, onClose, onSave }: { lista: any, onClose: () => void, onSave: (id: string, updates: any) => void }) {
    const [nome, setNome] = useState(lista.nome);
    const [descricao, setDescricao] = useState(lista.descricao);
    const [tarefas, setTarefas] = useState<string[]>([]);
    const [novaTarefa, setNovaTarefa] = useState("");

    // Inicializar tarefas corretamente
    useEffect(() => {
        const tarefasFormatadas = lista.tarefas.map((t: any) => {
            if (typeof t === 'object' && t.texto) {
                return t.texto; // Pega apenas o texto para edição
            }
            return t; // Já é string
        });
        setTarefas(tarefasFormatadas);
    }, [lista.tarefas]);

    const handleSave = async () => {
        try {
            console.log("Tarefas antes de salvar:", tarefas);

            await onSave(lista._id, {
                nome: nome.trim(),
                descricao: descricao.trim(),
                tarefas: tarefas.filter(t => t.trim() !== ""), // Remove tarefas vazias
            });

            toast.success("Lista atualizada com sucesso");
        }
        catch (error) {
            console.error("Erro ao salvar:", error);
            toast.error("Erro ao atualizar lista");
            throw error; // Propaga o erro para o componente pai
        }
    }

    const AdicionarTarefa = () => {
        if (novaTarefa.trim() === "") return;
        setTarefas([...tarefas, novaTarefa.trim()]);
        setNovaTarefa("");
    }

    const RemoverTarefa = (index: number) => {
        setTarefas(tarefas.filter((_, i) => i !== index));
    }

    const EditarTarefa = (index: number, novoTexto: string) => {
        const novasTarefas = [...tarefas];
        novasTarefas[index] = novoTexto;
        setTarefas(novasTarefas);
    }

    // Adicione esta função para lidar com Enter no input
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            AdicionarTarefa();
        }
    }

    return (
        <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-300 to-cyan-800 bg-clip-text text-transparent mb-8">
                Editar Lista
            </h1>

            <div className="space-y-6">
                <Input
                    type="text"
                    placeholder="Nome da Lista"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="border-2 border-cyan-200 focus:border-cyan-500"
                />

                <Input
                    type="text"
                    placeholder="Descrição da Lista"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    className="border-2 border-cyan-200 focus:border-cyan-500"
                />

                <div className="flex w-full gap-3 items-center mt-4">
                    <Input
                        type="text"
                        placeholder="Digite uma nova tarefa..."
                        value={novaTarefa}
                        onChange={(e) => setNovaTarefa(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="border-2 border-cyan-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 transition-all duration-300 flex-1"
                    />
                    {/*Tive que usar um botão normal pq por algum motivo o componente tava ficando bizarramente grande*/}
                    <button
                        type="button"
                        onClick={AdicionarTarefa}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 hover:scale-110 cursor-pointer rounded-lg transition-all duration-200 whitespace-nowrap text-sm min-w-[100px]"
                    >
                        Adicionar
                    </button>
                </div>

                <div className="bg-cyan-50 p-4 rounded-xl border-2 border-cyan-200">
                    <h3 className="text-lg font-semibold text-cyan-800 mb-3">
                        📝 Tarefas da Lista ({tarefas.length})
                    </h3>

                    {tarefas.length === 0 ? (
                        <p className="text-gray-500 italic py-4">
                            Nenhuma tarefa adicionada
                        </p>
                    ) : (
                        <div className="max-h-60 overflow-y-auto space-y-2">
                            {tarefas.map((tarefa, index) => (
                                <div key={index} className="flex gap-2 items-center bg-white p-3 rounded-lg border border-cyan-300">
                                    <Input
                                        type="text"
                                        value={tarefa}
                                        onChange={(e) => EditarTarefa(index, e.target.value)}
                                        className="border border-cyan-300 flex-1"
                                        placeholder="Digite a tarefa..."
                                    />
                                    <button
                                        onClick={() => RemoverTarefa(index)}
                                        className="bg-linear-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold hover:scale-105 cursor-pointer transform transition-all duration-200 hover:shadow-lg shadow-md"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-4 justify-center mt-6">
                    <Button
                        onClick={onClose}
                        className="bg-linear-to-r from-gray-500 to-gray-600 text-white px-8"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-linear-to-r from-cyan-500 to-cyan-700 text-white px-8"
                    >
                        Salvar
                    </Button>
                </div>
            </div>
        </div>
    );
}

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
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [listaSelecionada, setListaSelecionada] = useState<Lista | null>(null);
    const [listaParaEditar, setListaParaEditar] = useState<Lista | null>(null);

    //Carrega listas automaticamente, sem precisar apertar o botão
    useEffect(() => {
        if (userEmail) {
            CarregarListas();
        }
    }, [userEmail]);

    const CarregarListas = async () => {
        try {
            const response = await api.get(`/lists?userEmail=${userEmail}`);
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
            await api.delete(`/lists/${id}`);
            setListas(listas.filter(l => l._id !== id));
            toast.success("Lista deletada com sucesso!");
        } catch (error) {
            console.error("Erro ao deletar lista:", error);
            toast.error("Erro ao deletar lista!");
        }
    }

    const abrirModalEditar = (lista: Lista, e: React.MouseEvent) => {
        e.stopPropagation();
        setListaParaEditar(lista);
        setModalEditarAberto(true);
    };

    const fecharModalEditar = () => {
        setModalEditarAberto(false);
        setListaParaEditar(null);
    };

    const salvarEdicaoLista = async (id: string, updates: any) => {
        try {
            // Garante que as tarefas estejam no formato correto
            const dadosParaEnviar = {
                ...updates,
                tarefas: updates.tarefas.map((t: any) => {
                    if (typeof t === 'string') {
                        return { texto: t, concluida: false };
                    }
                    return t; // Já está no formato objeto
                })
            };

            console.log("Dados enviados para servidor:", dadosParaEnviar);

            await api.put(`/lists/${id}`, dadosParaEnviar);

            // Atualiza a lista local
            setListas(listas.map(l => l._id === id ? { ...l, ...updates } : l));
            toast.success("Lista atualizada com sucesso!");
            fecharModalEditar();
        } catch (error) {
            console.error("Erro detalhado ao salvar:", error);
            toast.error("Erro ao atualizar lista!");
            throw error;
        }
    };


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

    //Função para atualizar uma lista específica
    const atualizarLista = (listaAtualizada: any) => {
        setListas(prevListas =>
            prevListas.map(l =>
                l._id === listaAtualizada._id ? listaAtualizada : l
            )
        );
    };

    return (
        <div className="flex flex-col items-center text-center bg-linear-to-br from-blue-400 via-blue-500 to-indigo-600 sm:w-[70vw] w-[95vw] min-h-[80vh] rounded-3xl p-8 gap-8 mt-8 shadow-2xl border-2 border-white border-opacity-20">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white border-opacity-30 w-full">
                <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 drop-shadow-2xl mb-4">
                    Bem-vindo às suas Listas, {userName}!
                </h1>
                <p className="text-blue-400 text-lg sm:text-xl mb-6">
                    Organize suas tarefas de forma simples e eficiente
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={CarregarListas}
                        className="bg-linear-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white border-opacity-20"
                    >
                        Atualizar Listas
                    </Button>
                    <Button
                        onClick={abrirModalCriar}
                        className="bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-2 border-white border-opacity-20"
                    >
                        Criar Nova Lista
                    </Button>
                </div>
            </div>

            <div className="flex flex-col gap-6 w-full max-h-[60vh] overflow-y-auto px-2 py-4">
                {listas.length === 0 ? (
                    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-12 rounded-3xl text-gray-600 text-xl border-2 border-white border-opacity-30 shadow-2xl">
                        <div className="text-6xl mb-4">📝</div>
                        Nenhuma lista encontrada. <br />
                        <span className="text-blue-600 font-semibold">Crie sua primeira lista!</span>
                    </div>
                ) : (
                    listas.map((lista) => (
                        <div
                            key={lista._id}
                            className="flex flex-col xl:flex-row justify-between items-start bg-white bg-opacity-95 backdrop-blur-sm p-6 rounded-3xl border-2 border-white border-opacity-30 transition-all duration-300 hover:scale-101 hover:shadow-2xl shadow-lg group"
                            onClick={() => abrirModalLista(lista)}
                        >
                            <div className="flex flex-col w-full xl:w-4/5 gap-3">
                                <h2 className="font-bold text-2xl sm:text-3xl bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                    {lista.nome}
                                </h2>
                                <p className="text-gray-700 text-lg">{lista.descricao}</p>
                                <p className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full inline-block self-start">
                                    📋 {lista.tarefas.length} tarefa(s) - Clique para ver detalhes
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 mt-4 xl:mt-0 xl:ml-4">
                                <button
                                    className="bg-linear-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold hover:scale-105 cursor-pointer transform transition-all duration-200 hover:shadow-2xl shadow-lg border-2 border-white border-opacity-20 group-hover:border-opacity-40"
                                    onClick={(e) => DeletarLista(lista._id, e)}
                                >
                                    X
                                </button>
                                <button
                                    className="bg-linear-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full font-bold hover:scale-105 cursor-pointer transform transition-all duration-200 hover:shadow-2xl shadow-lg border-2 border-white border-opacity-20 group-hover:border-opacity-40"
                                    onClick={(e) => abrirModalEditar(lista, e)}
                                >
                                    ✏️
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
                        onListaAtualizada={atualizarLista}
                    />
                )}
            </Modal>

            {/* MODAL PARA CRIAR NOVA LISTA */}
            <Modal
                isOpen={modalCriarAberto}
                onClose={fecharModalCriar}
                mode="criar"
            >
                <ConteudoCriarLista
                    onClose={fecharModalCriar}
                    onListaCriada={CarregarListas}
                />
            </Modal>

            {/* MODAL PARA EDITAR A LISTA */}
            <Modal
                isOpen={modalEditarAberto}
                onClose={fecharModalEditar}
                mode="editar"
            >
                {listaParaEditar && (
                    <ConteudoEditarLista
                        lista={listaParaEditar}
                        onClose={fecharModalEditar}
                        onSave={salvarEdicaoLista}
                    />
                )}
            </Modal>
        </div>
    );
}