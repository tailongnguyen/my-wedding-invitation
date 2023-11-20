"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';
import localFont from 'next/font/local'

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})
const dalatCapFont = localFont({ src: '../fonts/MTDalatSansCapRegular-Ver1.1.otf'})

export default function Button(props) {
    const [isLoading, setIsLoading] = useState(false);    

    // console.log(styles);
    function handleClick() {
        if (isLoading || props.disabled) {
            console.log("nah")
            return
        }
        setIsLoading(true);
        props.handleClick(() => {
            setIsLoading(false);
        });
    }

    return (
        <div 
            className={props.font == "dalat" ? dalatFont.className : dalatCapFont.className}
            style={{"backgroundColor": props.bgColor, "color": props.color,
                    fontSize: props.fontSize, cursor: "pointer", opacity: props.disabled ? 0.3 : 1.0,
                    "display": "flex", "justifyContent": "center", alignItems: "center", 
                    "width": props.width, "height": props.height, borderRadius: "min(1.5vh, 1vw)"}}
            onClick={handleClick}
        >
            {
                isLoading  ?
                <div><span className={styles.loader}></span></div>:
                <>
                    <p style={{marginTop: props.font == "dalat" ? 0 : "min(1vh, 0.5vw)", cursor: "pointer"}}>
                        {props.content}                        
                    </p>
                    {props.iconSrc && <img alt="icon" style={{"marginLeft": "1vw", maxHeight: "50%"}} src={props.iconSrc} />}
                </>
            }
                
        </div>
    )
}