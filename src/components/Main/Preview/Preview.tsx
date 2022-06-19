import React, { useEffect, useRef, useState } from "react";
import Classes from "./Preview.module.css";
import "./Preview.module.css";
import Settings from "./Settings/Settings";
import ImageHolder from "./ImageHolder/ImageHolder";
import { IASCII, ISettings } from "../../../types/types";
import { getASCII, getImageData } from "../../../utils/ImageManager";

interface PreviewProps {
    readonly src: string;
    readonly setSrc: React.Dispatch<React.SetStateAction<string | null>>;
}

const Preview = ({ src, setSrc }: PreviewProps) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const [ascii, setASCII] = useState<IASCII>({ data: [], width: 0, height: 0 });
    const [invertColors, setInvertColors] = useState<boolean>(false);

    useEffect(() => {
        (async function updateASCII() {
            const { width, height } = await getImageData(src);
            setASCII({ data: [], width, height });
        })();
    }, [])

    async function generateASCII(settings: ISettings): Promise<void> {
        const data = await getASCII(src, settings);
        setASCII(data);
    }

    return (
        <div className={Classes.preview}>
            <div className={Classes.group}>
                <Settings { ...{
                    generateASCII,
                    invertColors,
                    setInvertColors,
                    setSrc
                }}/>
            </div>
            <div className={Classes.group}>
                <ImageHolder { ...{
                    src,
                    ascii,
                    containerRef,
                    invertColors
                }}/>
            </div>
        </div>
    );
}

export default Preview;