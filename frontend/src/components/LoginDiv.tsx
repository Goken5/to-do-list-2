import { useState } from "react"

type dados = {
    nome: string;
    email: string;
    senha: string;
}
export default function Login(){
    return(
        <form className=" justify-center border-blue-600 bg-blue-300 p-5 rounded-3xl ">
            <label htmlFor="email" className="block text-black">Email:</label>
            <input type="text" className="block text-black border-black border-1 transition-all focus:border-3 bg-neutral-50 rounded-2xl"/>
            <label htmlFor="nome" className="block text-black">Nome</label>
            <input type="text" className="block text-black border-black border-1 transition-all focus:border-3 bg-neutral-50 rounded-2xl"/>

        </form>
    )
}