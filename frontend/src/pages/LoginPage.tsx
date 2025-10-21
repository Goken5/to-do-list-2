import { Header, Footer } from "../components/HeaderFooter"
import Login from "../components/LoginDiv"

export default function MainPage(){
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex h-full items-center flex-1 flex-col mt-[50px] text-center justify-center">
                <div className="w-[300px] justify-center text-center">
                    <Login />   
                </div>
            </div>
            <Footer />
        </div>
    )
}