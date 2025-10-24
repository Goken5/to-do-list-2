import { useState } from "react";

import { Header, Footer } from "../components/HeaderFooter";
import { ListDiv, CreateListDiv } from "../components/List";

export default function MainPage(){
    const [showCreateDiv, setShowCreateDiv] = useState(false);

    return(
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden items-center justify-center gap-10 max-w-7xl mx-auto">

            <Header />
            <div className="flex flex-1 justify-center items-center grow px-4 py-10 sm:mt-10 flex-col">
                <ListDiv CreateList={() => setShowCreateDiv(true)} />
                {showCreateDiv && (
                    <div className="mt-6">
                        <CreateListDiv />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}