import React from "react";
import Classes from "./Preview.module.css";
import "./Preview.module.css";
import Settings from "./Settings/Settings";
import ImageHolder from "./ImageHolder/ImageHolder";

interface PreviewProps {
    readonly src: string;
}

const Preview = ({ src }: PreviewProps) => {

    // const []
    return (
        <div>
            <div className={Classes.group}>
                <Settings/>
            </div>
            <div className={Classes.group}>
                <ImageHolder src={src}/>
            </div>
        </div>
    );
}

export default Preview;