import React from "react";
import Classes from "./Input.module.css";
import "./Input.module.css";
import { density } from "../../../utils/ImageManager";

interface InputProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Input = ({ value, setValue }: InputProps) => {
    return (
        <input
            className={Classes.input}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Input ascii here . . ."
            value={value}
        />
    );
}

export default Input;