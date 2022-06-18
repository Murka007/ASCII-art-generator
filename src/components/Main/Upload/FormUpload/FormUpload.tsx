import React, { useState } from "react";
import Classes from "./FormUpload.module.css";
import "./FormUpload.module.css";
import { readImage } from "../../../../utils/ImageManager";

interface FormUploadProps {
    readonly setSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

const FormUpload = ({ setSrc }: FormUploadProps) => {
    const [dropping, setDropping] = useState<boolean>(false);
    const classList = [Classes.form];
    if (dropping) classList.push(Classes.dropping);

    async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
        setDropping(false);
        const files = event.target.files;
        if (files === null) return;
        const result = await readImage(files[0]);
        if (!(result instanceof ArrayBuffer)) setSrc(result);
    }

    function dragEnter(): void {
        setDropping(true);
    }

    function dragLeave(): void {
        setDropping(false);
    }

    return (
        <div className={Classes.upload}>
            <h1 className={Classes.header}>Upload image</h1>
            <div className={classList.join(" ")}>
                <input
                    className={Classes.input}
                    type="file"
                    accept="image/*"
                    onDragEnter={dragEnter}
                    onDragLeave={dragLeave}
                    onChange={uploadImage}
                />
                <span className={Classes.label}>
                    DRAG FILE HERE<br/>OR <span className={Classes.span}>BROWSE</span>
                </span>
            </div>
        </div>
    );
}

export default FormUpload;