export function Header(){

    return(
        <header className="fixed top-0 flex flex-col h-15 bg-blue-900 text-center w-full justify-center">
            <div>
                <h1 className="margin-5 text-white text-2xl">To-do List</h1>
            </div>
        </header>
    )
}
export function Footer(){
    return(
        <footer className="fixed bottom-0 flex flex-col h-[30px] bg-blue-900 text-center w-full justify-center">
            <div>
                <h1 className="margin-5 text-white text-2xl">Crie sua lista de Tarefas</h1>
            </div>
        </footer>
    )
}