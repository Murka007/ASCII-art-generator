import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import LoadingPopup from "./components/LoadingPopup/LoadingPopup";
import Main from "./components/Main/Main";
import { AppContext } from "./context";

const App = () => {

    const [loading, setLoading] = useState<boolean>(false);
    return (
        <AppContext.Provider
            value={{
                loading,
                setLoading
            }}
        >
            <Header/>
            <Main/>
            {
                loading && (
                    <LoadingPopup/>
                )
            }
        </AppContext.Provider>
    );
}

export default App;
