import React, { useState } from "react";
import Classes from "./Settings.module.css";
import "./Settings.module.css";
import { ButtonType, IOption, Quality } from "../../../../types/types";
import { density } from "../../../../utils/ImageManager";
import Checkbox from "../../../UI/Checkbox/Checkbox";
import Button from "../../../UI/Button/Button";
import Select from "../../../UI/Select/Select";
import Input from "../../../UI/Input/Input";

const options: IOption[] = [
    { value: Quality.original, label: "Original" },
    { value: Quality.high, label: "High" },
    { value: Quality.middle, label: "Middle" },
    { value: Quality.low, label: "Low" }
];

const Settings = () => {

    const [invertASCII, setInvertASCII] = useState<boolean>(false);
    const [invertColors, setInvertColors] = useState<boolean>(false);
    const [characters, setCharacters] = useState<string>(density);
    const [quality, setQuality] = useState<number>(Quality.low);

    function generateASCII(): void {

    }

    function reset(): void {
        setInvertASCII(false);
        setInvertColors(false);
        setCharacters(density);
        setQuality(Quality.low);
    }

    return (
        <div className={Classes.settings}>
            <h1>Settings</h1>
            <div className={Classes.container}>

                <div className={Classes.group}>
                    <div className={Classes.label}>
                        <p>Quality</p>
                        <Select value={quality} setValue={setQuality} options={options}/>
                    </div>
                    <div className={Classes.label}>
                        <p>Characters</p>
                        <Input value={characters} setValue={setCharacters}/>
                    </div>
                </div>

                <div className={Classes.group}>
                    <Checkbox
                        checked={invertASCII}
                        setChecked={setInvertASCII}
                    >Invert ASCII</Checkbox>
                    <Checkbox
                        checked={invertColors}
                        setChecked={setInvertColors}
                    >Invert Colors</Checkbox>
                </div>

                <Button list={[Classes.button]} handleEvent={generateASCII} type={ButtonType.unique}>Generate</Button>
                <Button handleEvent={reset}>Reset</Button>
            </div>
        </div>
    );
}

export default Settings;