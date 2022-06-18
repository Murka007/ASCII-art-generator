import React from "react";
import Classes from "./Upload.module.css";
import "./Upload.module.css";
import FormUpload from "./FormUpload/FormUpload";

interface FormUploadProps {
    readonly setSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

const Upload = ({ setSrc }: FormUploadProps) => {
    return (
        <div className={Classes.upload}>
            <h1 className={Classes.header1}>ASCII art generator</h1>
            <h2 className={Classes.header2}>A tool that generates ASCII art from your image</h2>
            <FormUpload setSrc={setSrc}/>
        </div>
    );
}

export default Upload;