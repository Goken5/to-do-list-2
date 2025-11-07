
import { Header, Footer } from "../components/HeaderFooter";
import { ViewList } from "../components/List";

export default function MainPage(){

    return(
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden items-center justify-center gap-10 max-w-7xl mx-auto">

            <Header />
            <div className="flex flex-1 justify-center items-center grow px-4 py-10 sm:mt-10 flex-col">
                <ViewList/>
            </div>
            <Footer />
        </div>
    )
}