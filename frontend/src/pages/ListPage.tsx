import { Header, Footer } from "../components/HeaderFooter";
import { ViewList } from "../components/List";

export default function ListPage(){
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 justify-center items-center px-4 sm:px-[100px] flex-col-reverse sm:flex-row w-screen mt-5">
                <ViewList />
            </div>
            <Footer />
        </div>
    )
}