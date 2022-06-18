import React, { useEffect, useRef, useState } from "react";
import Classes from "./ImageHolder.module.css";
import "./ImageHolder.module.css";
import { IASCII, IScale } from "../../../../types/types";
import { resizeText } from "../../../../utils/Common";
import { density, getASCII, getScale } from "../../../../utils/ImageManager";

interface ImageHolderProps {
    readonly src: string;
}

const ImageHolder = ({ src }: ImageHolderProps) => {

    const divRef = useRef<HTMLDivElement>(null);
    const [ascii, setASCII] = useState<IASCII>({ data: [], width: 0, height: 0 });

    useEffect(() => {
        if (divRef.current) resizeText(divRef.current);
    }, [divRef.current])

    useEffect(() => {
        (async function updateASCII() {
            const data = await getASCII(src, density);
            setASCII(data);
        })();
    }, [src])

    const imageScale: IScale = {
        width: ascii.width * 2 + 15,
        height: ascii.height
    };

    const scale = getScale(imageScale, { width: 600, height: 600 }) || 1;

    return (
        <div
            className={Classes.preview}
            style={{ width: imageScale.width * scale, height: imageScale.height * scale }}
        >
            <div
                className={Classes.wrapper}
                style={{transform: `scale(${scale})`}}
            >
                <div className={Classes.table}>
                    <div
                        className={Classes.container}
                        style={{ width: ascii.width, height: ascii.height }}
                    >
                        <img className={Classes.img} src={src}/>
                    </div>
                </div>

                <div className={Classes.table}>
                    <div
                        className={Classes.container}
                        ref={divRef}
                        style={{width: ascii.width, height: ascii.height}}
                    >
                    {
                        ascii.data.map((char, i) => <div key={i}>{ char }</div>)
                    }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageHolder;