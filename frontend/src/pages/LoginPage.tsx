import { Header, Footer } from "../components/HeaderFooter"
import { Login } from "../components/LoginDiv"

export default function MainPage(){
    return(
      <div className="flex flex-col min-h-screen">
        <Header />
  
        <div className="flex flex-1 justify-center items-center px-4 sm:px-[100px]">
          
          <div className="w-[90vw] sm:w-[40vw] sm:flex-row flex flex-col-reverse sm:justify-end justify-center items-center text-center">
            <Login />
          </div>
        </div>
  
        <Footer />
      </div>
    )
  }