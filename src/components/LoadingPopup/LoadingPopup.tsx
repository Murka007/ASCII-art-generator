import React from "react";
import Classes from "./LoadingPopup.module.css";
import "./LoadingPopup.module.css";

const LoadingPopup = () => {
    return (
        <div className={Classes.popup}>
            <div className={Classes["lds-ellipsis"]}><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default LoadingPopup;