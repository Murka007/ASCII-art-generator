import React, { FC } from "react";
import Classes from "./Button.module.css";
import "./Button.module.css";
import { ButtonType } from "../../../types/types";

interface ButtonProps {
    readonly handleEvent: () => void;

    /**
     * List of additional classes
     */
    readonly list?: string[];

    /**
     * Type of the button
     */
    readonly type?: number;
    readonly children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ handleEvent, list, type, children }) => {

    const classList = [Classes.button];
    if (type === ButtonType.unique) classList.push(Classes.unique);
    if (Array.isArray(list)) classList.push(...list);
    return (
        <button
            className={classList.join(" ")}
            onClick={handleEvent}
        >{ children }</button>
    );
}

export default Button;