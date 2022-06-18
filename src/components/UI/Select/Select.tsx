import React, { useState } from "react";
import Classes from "./Select.module.css";
import "./Select.module.css";
import { IOption } from "../../../types/types";

interface SelectProps {
    readonly value: number;
    readonly setValue: React.Dispatch<React.SetStateAction<number>>;
    readonly options: IOption[];
}

const Select = ({ value, setValue, options }: SelectProps) => {

    const [opened, setOpened] = useState<boolean>(false);

    function updateValue(value: number): void {
        setOpened(false);
        setValue(value);
    }

    const classList = [Classes.select];
    if (opened) classList.push(Classes.active);
    return (
        <div
            className={classList.join(" ")}
            tabIndex={0}
            onClick={() => setOpened(!opened)}
            onBlur={() => setOpened(false)}
        >
            { options[value].label }
            <i className={Classes.icon}></i>
            {
                opened && (
                    <div className={Classes.options}>
                        {
                            options.map((option: IOption) => {
                                return option.value === value ? null : (
                                    <div
                                        key={option.value}
                                        className={Classes.option}
                                        onClick={() => updateValue(option.value)}
                                    >{ option.label }</div>
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    );
}

export default Select;