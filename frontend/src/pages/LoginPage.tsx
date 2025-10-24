import { Header, Footer } from "../components/HeaderFooter"
import { Login } from "../components/LoginDiv"
import About from "../components/AboutDiv"

export default function LoginPage(){
    return(
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1 justify-center xl:justify-end items-center px-4 xl:px-[100px] flex-col-reverse xl:flex-row lg:mt-15 xl:m-0">
          <div className="w-[90vw] sm:w-[50vw] flex justify-center items-center text-center sm:m-15 ">
            <About />
          </div>
          <div className="w-[90vw] sm:w-[50vw] flex justify-center items-center text-center m-15 sm:m-0">
            <Login />
          </div>
        </div>
        <Footer />
      </div>
    )
  }