import { useState } from "react"

type dados = {
    nome: string;
    email: string;
    senha: string;
}
export default function Login(){
    return(
        <form className=" text-center justify-center border-blue-600 bg-blue-300 p-5 rounded-3xl  ">
            <label htmlFor="email" className="block text-black">Email:</label>
            <input type="text" className="block text-black border-black border-1 transition-all focus:scale-105 focus:border-2 bg-neutral-50 rounded-2xl w-full"/>
            <label htmlFor="nome" className="block text-black">Nome</label>
            <input type="text" className="block text-black border-black border-1 transition-all focus:scale-105 focus:border-2 bg-neutral-50 rounded-2xl w-full"/>
            <label htmlFor="nome" className="block text-black">Senha</label>
            <input type="password" className="block text-black border-black border-1 transition-all focus:scale-105 focus:border-2 bg-neutral-50 rounded-2xl w-full"/>
        </form>
    )
}