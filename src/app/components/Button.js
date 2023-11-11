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
        if (isLoading) {
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
                    fontSize: props.fontSize, cursor: "pointer",
                    "display": "flex", "justifyContent": "center", alignItems: "center", 
                    "width": "180px", "height": "50px", borderRadius: "7px"}}
            onClick={handleClick}
        >
            {
                isLoading  ?
                <div><span className={styles.loader}></span></div>:
                <>
                    {props.content}
                    {props.iconSrc && <Image alt="icon" style={{"marginLeft": "5px"}} src={props.iconSrc} />}
                </>
            }
                
        </div>
    )
}