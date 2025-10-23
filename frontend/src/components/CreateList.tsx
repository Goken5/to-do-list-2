export function CreateList(){
    return(
        <div className="flex flex-col text-center justify-center border-blue-600 border-2 bg-blue-300 sm:w-[60vw] sm:h-[60vh] w-[90vw] h-[50vh] rounded-3xl items-center">
            <h1 className="text-4xl text-white font-semibold m-10">Crie sua Lista</h1>
            <button className="
            bg-blue-700 rounded-4xl border-black border-2 p-3 pr-20 pl-20
            hover:scale-110 hover:cursor-pointer transition-all
            text-white hover:text-black hover:shadow-2xl
            hover:shadow-black mb-3">Criar uma Lista</button>
            <button className="
            bg-blue-700 rounded-4xl border-black border-2 p-3 pr-20 pl-20
            hover:scale-110 hover:cursor-pointer transition-all
            text-white hover:text-black hover:shadow-2xl
            hover:shadow-black mb-3">Visualizar Lista</button>
        </div>
    )
}