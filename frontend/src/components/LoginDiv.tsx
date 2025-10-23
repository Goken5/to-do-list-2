import { useNavigate } from "react-router-dom";
import Input from "./Input"

type dados = {
    nome: string;
    email: string;
    senha: string;
}
export function Login(){
    const navigate = useNavigate();
    return(
        <form className=" flex flex-col text-center justify-center border-blue-600 border-2 bg-blue-300 sm:w-[40vw] w-[90vw] h-[70vh] rounded-3xl items-center ">
            <h1 className="text-4xl text-white font-bold mb-5">Bem Vindo!</h1>
            <h2 className="text-3xl text-white font-bold mb-10">Faça Login no To-do List</h2>
            <Input type="email" placeholder="E-mail"/>
            <Input type="password" placeholder="Senha"/>
            <p className="text-white text-2xl">Novo por aqui?</p> <button className="text-white underline transition-all hover:scale-110 hover:cursor-pointer" onClick={() => navigate('/registro')}>Registre-se</button>
        </form>
    )
}
export function Registro(){
    return(
        <form className="text-center justify-center border-blue-600 bg-blue-300 rounded-3xl">
            <Input type="text" placeholder="Nome"/>
            <Input type="email" placeholder="E-mail"/>
            <Input type="password" placeholder="Senha" />
            <Input type="passoword" placeholder="Confirmar Senha" />
        </form>
    )
}