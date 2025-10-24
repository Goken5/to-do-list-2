import { useNavigate } from "react-router-dom"
import { Input, Button } from "./Input";

interface ListDivProps {
    CreateList: () => void;
}
export function ListDiv({ CreateList } : ListDivProps){
    const navigate = useNavigate();

    return(
        <div className="flex flex-col text-center justify-center items-center
        border-blue-600 border-2 bg-blue-300
        w-[90vw] max-w-[700px] rounded-3xl p-6 mt-6">
                
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

export function CreateListDiv(){
    return(
        <div className="flex flex-col text-center justify-center items-center
            border-blue-600 border-2 bg-blue-300
            w-[90vw] max-w-[700px] rounded-3xl p-6 mt-6">

            <h1 className="text-2xl sm:text-3xl text-white font-semibold mb-4">
                Crie sua Lista
            </h1>

            <form className="flex flex-col w-full items-center">
                <Input type="text" placeholder="Nome da Lista (ex: lista de compras)" />
                <Input type="text" placeholder="Descrição da Lista" />
                <Button type="submit">Criar Lista</Button>
            </form>
        </div>
    )
}


export function ViewList(){

    return(
        <div className="flex flex-col text-center border-blue-600 border-2 bg-blue-300 sm:w-[60vw] sm:min-h-[70vh] w-[90vw] min-h-[50vh] rounded-3xl items-center">
            <h1 className="text-4xl text-white font-semibold m-15">Suas Listas:</h1>
        </div>
    )
}
