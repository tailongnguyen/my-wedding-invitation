"use client";

import { useRef } from 'react';
import styles from '../page.module.css';
import localFont from 'next/font/local'
import Button from './Button';
import Link from 'next/link';

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})
const dalatCapFont = localFont({ src: '../fonts/MTDalatSansCapRegular-Ver1.1.otf'})
const font7 = localFont({ src: '../fonts/SVN_HC_Elixir_Sans.otf'});

export default function Map(props) {

    const linkRef = useRef(null);

    function openMap(callback) {
        linkRef.current.click();
        callback();
    }

    return (
        <div style={{backgroundColor: "#3D461C", height: "100%", position: "relative"}}>
            <img src="image 10.png" style={{position: "absolute", top: "-12vw", width: "24vw", right: 0}}></img>
            
            <div style={{paddingTop: "min(4vh, 5vw)", marginLeft: "5vw"}}>
                <img style={{maxWidth: "30vw"}} src={"text2.png"} />
                <p className={dalatFont.className} style={{fontSize: "min(4vh, 4vw)", marginTop: "2vw", marginBottom: "2vw", maxWidth: "70vw", color: "#F6EAD1"}}>Địa chỉ: Nhà văn hóa cụm 6, ngõ 109,  thôn Phan Long, xã Tân Hội, huyện Đan Phượng, thành phố Hà Nội</p>

                <Link ref={linkRef} style={{display: "none"}} href="https://maps.app.goo.gl/YX22xdme2y88yaGh9" target={"_blank"} ></Link>
                <Button 
                    font="dalatcap"
                    fontSize={"min(3vh, 3vw)"}
                    bgColor="#E19E00"
                    color="#3D461C"
                    height="min(7vh, 7vw)"
                    width="min(50vh, 50vw)"
                    content="Mở trong google map"
                    handleClick={openMap}
                    iconSrc="map.png"
                />

                <img src="Group 28.png" style={{marginTop: "4vw", maxWidth: "90vw", width: "90%"}}></img>
                <img src="image 12.png" style={{position: "absolute", bottom: 0, width: "100vw", left: 0}}></img>
            </div>
        </div>
    )
}