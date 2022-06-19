import React, { useContext, useEffect } from "react";
import Classes from "./ImageHolder.module.css";
import "./ImageHolder.module.css";
import { IASCII, IScale } from "../../../../types/types";
import { resizeText } from "../../../../utils/Common";
import { getScale } from "../../../../utils/ImageManager";
import { AppContext, IAppContext } from "../../../../context";

interface ImageHolderProps {
    readonly src: string;
    readonly ascii: IASCII;
    readonly containerRef: React.RefObject<HTMLDivElement>;
    readonly invertColors: boolean;
}

const ImageHolder = ({ src, ascii, containerRef, invertColors }: ImageHolderProps) => {

    const { loading, setLoading } = useContext(AppContext) as IAppContext;

    useEffect(() => {
        if (ascii.data.length && containerRef.current !== null) {
            setLoading(true);
        }
    }, [ascii.data, containerRef.current]);

    useEffect(() => {
        if (loading && ascii.data.length && containerRef.current !== null) {
            resizeText(containerRef.current);
            setLoading(false);
        }
    }, [loading])

    const imageScale: IScale = {
        width: ascii.width * 2 + 15,
        height: ascii.height
    };

    const scale = getScale(imageScale, { width: 600, height: 600 }) || 1;

    const classList = [Classes.container];
    if (loading) classList.push(Classes.hidden);
    if (invertColors) classList.push(Classes.inverted);

    return (
        <div
            className={Classes.preview}
            style={{ width: imageScale.width * scale, height: imageScale.height * scale }}
        >
            <div className={Classes.wrapper}>

                <div className={Classes.containerWrapper} style={{transform: `scale(${scale})`}}>

                    <div className={Classes.table}>
                        <div
                            className={Classes.container}
                            style={{ width: ascii.width, height: ascii.height }}
                        >
                            <img draggable={false} className={Classes.img} src={src}/>
                        </div>
                    </div>


                    <div className={Classes.table}>
                        <div
                            className={classList.join(" ")}
                            ref={containerRef}
                            style={{width: ascii.width, height: ascii.height}}
                        >
                        {
                            ascii.data.map((char, i) => <div key={i}>{ char }</div>)
                        }
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ImageHolder;