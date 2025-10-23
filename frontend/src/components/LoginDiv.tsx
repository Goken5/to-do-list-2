import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import Input from "./Input"
import axios from "axios";


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
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");

    const handleClick = async(e: FormEvent) => {
        e.preventDefault()
        if(senha != confirmar){
            alert("As senhas não coincidem");
            return;
        }
        console.log("Recebi os crias: " + nome + email + senha + confirmar);
        await axios.post("http://localhost:8000", {
            "nome": nome, 
            "email": email,
            "senha": senha,
        });
    }

    return(
        <form className=" flex flex-col text-center justify-center border-blue-600 border-2 bg-blue-300 sm:w-[70vw] w-[90vw] h-[70vh] rounded-3xl items-center">
            <h1 className="text-4xl text-white font-bold mb-5">Registre-se no To-do List</h1>
            <h2 className="text-3xl text-white font-semibold mb-10">Registre-se no To-do List e comece a organizar suas ideias <strong>hoje</strong></h2>
            <Input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)}/>
            <Input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)}/>
            <Input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />
            <Input type="password" placeholder="Confirmar Senha" onChange={(e) => setConfirmar(e.target.value)}/>
            <button type="submit" className="
            bg-blue-700 rounded-4xl border-black border-2 p-3 pr-20 pl-20
              hover:scale-110 hover:cursor-pointer transition-all
            text-white hover:text-black hover:shadow-2xl
            hover:shadow-black mb-3"
            onClick={handleClick}>Registrar</button>
        </form>
    )
}