import React, { useState } from "react";
import Classes from "./Settings.module.css";
import "./Settings.module.css";
import { ButtonType, IOption, ISettings, Quality } from "../../../../types/types";
import { density } from "../../../../utils/ImageManager";
import Checkbox from "../../../UI/Checkbox/Checkbox";
import Button from "../../../UI/Button/Button";
import Select from "../../../UI/Select/Select";
import Input from "../../../UI/Input/Input";
import GenerateImage from "../../../../img/Generate.svg";
import UploadImage from "../../../../img/Upload.svg";
import ResetImage from "../../../../img/Reset.svg";

const options: IOption[] = [
    { value: Quality.original, label: "Original" },
    { value: Quality.high, label: "High" },
    { value: Quality.middle, label: "Middle" },
    { value: Quality.low, label: "Low" }
];

interface SettingsProps {
    readonly generateASCII: (settings: ISettings) => Promise<void> | void;
    readonly invertColors: boolean;
    readonly setInvertColors: React.Dispatch<React.SetStateAction<boolean>>;
    readonly setSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

const Settings = ({ generateASCII, invertColors, setInvertColors, setSrc }: SettingsProps) => {

    const [invertASCII, setInvertASCII] = useState<boolean>(false);
    const [characters, setCharacters] = useState<string>(density);
    const [quality, setQuality] = useState<number>(Quality.low);

    const settings: ISettings = {
        invertASCII,
        invertColors,
        characters,
        quality
    };

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

                <div className={Classes.group}>
                    <Button
                        list={[Classes.button]}
                        handleEvent={() => generateASCII(settings)}
                        type={ButtonType.unique}
                    ><img src={GenerateImage}/>Generate</Button>

                    <Button
                        list={[Classes.button]}
                        handleEvent={reset}
                    ><img src={ResetImage}/>Reset</Button>

                    <Button handleEvent={() => setSrc(null)}><img src={UploadImage}/>Upload</Button>
                </div>
            </div>
        </div>
    );
}

export default Settings;