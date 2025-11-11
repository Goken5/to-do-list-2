import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Input, Button } from "./Input"
import { toast } from "react-toastify";
import { api } from "../services/ApiService";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!email || !senha) {
            toast.error("Preencha todos os campos");
            return;
        }

        setLoading(true);

        try {
            console.log("Tentando fazer login...");
            
            const response = await api.post(`/users/login`, {
                email: email,
                senha: senha
            });

            console.log("Login bem-sucedido:", response.data);

            const user = response.data.user;
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.nome);

            navigate("/main");
            toast.success("Logado com Sucesso!");
            
        } catch (error: any) {
            console.error("❌ Erro no login:", error);
            
            if (error.response) {
                // Servidor respondeu com status de erro
                const status = error.response.status;
                const message = error.response.data?.message || "Erro desconhecido";
                
                if (status === 404) {
                    toast.error("Usuário não encontrado");
                } else if (status === 401) {
                    toast.error("Senha incorreta");
                } else if (status === 400) {
                    toast.error(message);
                } else if (status === 500) {
                    toast.error("Erro interno do servidor");
                } else {
                    toast.error(`Erro ${status}: ${message}`);
                }
                
            } else if (error.request) {
                // Request foi feito mas não houve resposta
                console.error("Sem resposta do servidor:", error.request);
                toast.error("Servidor não respondeu. Verifique se o backend está rodando.");
            } else {
                // Outro erro
                console.error("Erro inesperado:", error.message);
                toast.error("Erro ao fazer login");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-black/10 p-8 mx-auto">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">Bem-vindo</h1>
                <p className="text-gray-600 text-xl">Faça login no To-do List</p>
            </div>

            <form onSubmit={handleClick} className="space-y-4">
                <div>
                    <Input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div>
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <Button 
                    type="submit" 
                    disabled={loading}
                    className={loading ? "opacity-50 cursor-not-allowed" : ""}
                >
                    {loading ? "Entrando..." : "Login"}
                </Button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                    Não tem uma conta?{" "}
                    <button
                        onClick={() => navigate('/register')}
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium hover:cursor-pointer hover:underline"
                        disabled={loading}
                    >
                        Registre-se
                    </button>
                </p>
            </div>
        </div>
    )
}

export function SignUp() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: FormEvent) => {
        e.preventDefault();
        
        if (!nome || !email || !senha || !confirmar) {
            toast.error("Preencha todos os campos");
            return;
        }

        if (senha !== confirmar) {
            toast.error("As senhas não coincidem");
            return;
        }

        if (senha.length < 6) {
            toast.error("A senha deve ter pelo menos 6 caracteres");
            return;
        }

        setLoading(true);

        try {
            console.log("🔄 Tentando criar conta...");
            
            const response = await api.post("/users/register", {
                nome: nome,
                email: email,
                senha: senha
            });

            console.log("Conta criada com sucesso:", response.data);

            const user = response.data.user;
            localStorage.setItem("userEmail", user.email);
            localStorage.setItem("userName", user.nome);

            navigate("/main");
            toast.success("Conta criada com sucesso!");
            
        } catch (error: any) {
            console.error("Erro no cadastro:", error);
            
            if (error.response) {
                const status = error.response.status;
                const message = error.response.data?.message || "Erro desconhecido";
                
                if (status === 400) {
                    toast.error(message || "Dados inválidos");
                } else if (status === 409) {
                    toast.error("Usuário já existe");
                } else if (status === 500) {
                    toast.error("Erro interno do servidor");
                } else {
                    toast.error(`Erro ${status}: ${message}`);
                }
                
            } else if (error.request) {
                console.error("Sem resposta do servidor:", error.request);
            } else {
                console.error("Erro inesperado:", error.message);
                toast.error("Erro ao criar conta");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleClick} className="w-full max-w-md bg-white rounded-2xl shadow-lg shadow-black/10 p-8">
            <div className="text-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Criar conta</h1>
                <p className="text-gray-600">
                    Registre-se no To-do List e comece a organizar suas ideias <strong className="text-blue-600">hoje</strong>
                </p>
            </div>

            <div className="space-y-4">
                <Input
                    type="text"
                    placeholder="Nome de Usuário"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={loading}
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={loading}
                />
                <Input
                    type="password"
                    placeholder="Confirmar Senha"
                    value={confirmar}
                    onChange={(e) => setConfirmar(e.target.value)}
                    disabled={loading}
                />

                <Button 
                    type="submit"
                    disabled={loading}
                    className={loading ? "opacity-50 cursor-not-allowed" : ""}
                >
                    {loading ? "Criando conta..." : "Criar conta"}
                </Button>
            </div>

            <div className="mt-6 text-center">
                <p className="text-gray-600 text-sm">
                    Já tem uma conta?{" "}
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:text-blue-800 transition-colors font-medium hover:cursor-pointer hover:underline"
                        disabled={loading}
                    >
                        Fazer login
                    </button>
                </p>
            </div>
        </form>
    )
}