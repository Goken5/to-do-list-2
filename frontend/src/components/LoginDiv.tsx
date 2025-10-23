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
            <button type="submit" className="
            bg-blue-700 rounded-4xl border-black border-2 p-3 pr-20 pl-20
              hover:scale-110 hover:cursor-pointer transition-all
            text-white hover:text-black hover:shadow-2xl
            hover:shadow-black mb-3">Login</button>
            <div className="flex items-center gap-2 text-white text-2xl">
            <p>Não tem uma conta ainda?</p>
             <button className=" underline transition-all hover:scale-110 hover:cursor-pointer"
              onClick={() => navigate('/register')}>Registre-se</button>
            </div>
            
        </form>
    )
}
export function SignUp(){
    return(
        <form className=" flex flex-col text-center justify-center border-blue-600 border-2 bg-blue-300 sm:w-[70vw] w-[90vw] h-[70vh] rounded-3xl items-center">
            <h1 className="text-4xl text-white font-bold mb-5">Registre-se no To-do List</h1>
            <Input type="text" placeholder="Nome"/>
            <Input type="email" placeholder="E-mail"/>
            <Input type="password" placeholder="Senha" />
            <Input type="passoword" placeholder="Confirmar Senha" />
            <button type="submit" className="
            bg-blue-700 rounded-4xl border-black border-2 p-3 pr-20 pl-20
              hover:scale-110 hover:cursor-pointer transition-all
            text-white hover:text-black hover:shadow-2xl
            hover:shadow-black mb-3">Registrar</button>
        </form>
    )
}