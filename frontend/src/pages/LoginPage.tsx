import { Header, Footer } from "../components/HeaderFooter"
import { Login } from "../components/LoginDiv"

export default function MainPage(){
    return(
        <div className="flex flex-col min-h-screen min-w-screen">
            <Header />
            <div className="flex h-full justify-bottom flex-1 flex-row mt-[50px] mb-[50px] pr-[100px] justify-end">
                <div className="w-[40vw] flex justify-center items-center text-center">
                    <Login />   
                </div>
            </div>
            <Footer />
        </div>
    )
}