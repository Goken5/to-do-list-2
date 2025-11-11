import { Header, Footer } from "../components/HeaderFooter"
import { Login } from "../components/LoginDiv"

export default function LoginPage(){
    return(
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 justify-center xl:justify-center items-center px-4 xl:px-[100px] flex-col lg:m-5 xl:m-0 bg-linear-to-b from-blue-900 to-blue-50">
          <div className="w-[90vw] sm:w-[50vw] flex justify-center items-center text-center m-15 sm:m-0">
            <Login />
          </div>
        </div>
        <Footer />
      </div>
    )
  }