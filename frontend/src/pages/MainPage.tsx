
import { Header, Footer } from "../components/HeaderFooter";
import { ViewList } from "../components/List";

export default function MainPage() {

    return (
        <div className="flex flex-col min-h-screen">

            <Header />
            <div className="flex flex-1 justify-center xl:justify-center items-center px-4 xl:px-[100px] flex-col lg:m-5 xl:m-0 bg-linear-to-b from-blue-900 to-blue-50">
                <div className="flex flex-1 justify-center items-center grow px-4 py-10 sm:mt-10 flex-col">
                    <ViewList />
                </div>
            </div>
            <Footer />
        </div>
    )
}