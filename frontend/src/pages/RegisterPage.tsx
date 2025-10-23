import { Header, Footer } from "../components/HeaderFooter"
import { SignUp } from "../components/LoginDiv"

export default function RegisterPage(){
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 justify-center items-center px-4 sm:px-[100px] flex-col-reverse sm:flex-row w-screen">
                <SignUp />
            </div>
            <Footer />
        </div>
    )
}