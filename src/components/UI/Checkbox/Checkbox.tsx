import React, { FC } from "react";
import Classes from "./Checkbox.module.css";
import "./Checkbox.module.css";

interface CheckboxProps {
    readonly checked: boolean;
    readonly setChecked: React.Dispatch<React.SetStateAction<boolean>>;
    readonly children: React.ReactNode;
}

const Checkbox: FC<CheckboxProps> = ({ checked, setChecked, children }) => {
    return (
        <label className={Classes.container}>
            <input
                className={Classes.checkbox}
                type="checkbox"
                onChange={(event) => setChecked(event.target.checked)}
                checked={checked}
            />
            <span className={Classes.checkmark}></span>
            <span className={Classes.text}>{ children }</span>
        </label>
    );
}

export default Checkbox;