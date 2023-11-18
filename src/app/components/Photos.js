"use client";

import { useState, useRef } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import styles from '../page.module.css';
import localFont from 'next/font/local'
import Button from './Button';

const font5 = localFont({ src: '../fonts/UTM-Guanine.ttf'});
const font8 = localFont({ src: '../fonts/MTDalatSans.otf'});

export default function Photos(props) {

    const linkRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    // useEffect(() => {
        
    // });
    
    function onMouseEnter() {
        if (!isMobile) {
            setIsHovering(true);
        }
    }

    function onMouseLeave() {
        setIsHovering(false);
    }
    
    return (
        
            
            <div className={props.mode == "left" ? styles.photoLeft : props.mode == "right" ? styles.photoRight : styles.photoCenter}>
              <img src={props.bgImage} style={{width: "100%"}}></img>
              <div style={{position: "absolute", left: "50%", top: "50%", transform: "translateX(-50%) translateY(-50%)"}}>
                <img src='./text1.png' style={{opacity: (props.mode == "left" || props.mode == "center") ? 1 : 0, maxWidth: props.mode != "center" ? "15vw" : "20vw"}}></img>
                <div style={{position: "relative"}} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                  <img src={props.image} style={{marginTop: "min(5vh, 1.5vw)", opacity: isHovering ? 0.5 : 1, width: props.mode != "center" ? "40vw" : "80vw"}}></img>
                  <div style={{position: "absolute", left: "50%", top: "50%", display: isHovering ? "block" : "none", transform: "translateX(-50%) translateY(-50%)"}}>
                    <Button font="dalatcap"
                          fontSize={"min(3vh, 2vw)"}
                          bgColor="#E29F00"
                          color="#3D461C"
                          content="XEM ẢNH"
                          height="min(7vh, 5vw)"
                          width="min(22vh, 20vw)"
                          handleClick={(callback) => {
                            linkRef.current.click()
                            callback();
                          }}/>
                    <a href={props.link} ref={linkRef} target="_blank" style={{display: "none"}}></a>
                  </div>
                </div>
                <div style={{position: "relative"}}>
                    <MobileView>
                        <div style={{position: "absolute", right: 0, top: "min(1vh, 0.5vw)"}}>
                            <Button font="dalatcap"
                            fontSize={"3vw"}
                            bgColor="#E29F00"
                            color="#3D461C"
                            content="XEM ẢNH"
                            height="6vw"
                            width="25vw"
                            handleClick={(callback) => {
                                linkRef.current.click()
                                callback();
                            }}/>
                        </div>
                    </MobileView>
                    <p className={font5.className + " " + (props.mode != "center" ? styles.photoTitle : styles.photoTitleCenter)}>{props.content1}</p>
                    <p className={font8.className + " " + (props.mode != "center" ? styles.photoContent : styles.photoContentCenter)}>{props.content2}</p>
                </div>
              </div>
            </div>

            // <div style={{width: "50vw", backgroundColor: "#3D461C", position: "absolute", right: 0}}>
            //   <img src='./Rectangle 35.png' style={{width: "100%"}}></img>
            //   <div style={{position: "absolute", left: "50%", top: "50%", transform: "translateX(-50%) translateY(-50%)"}}>
            //     <img src='./text1.png'></img>
            // LADAKH
            // Cả hai đứa mình đều mê núi rừng, đã cùng nhau leo 3/4 đỉnh núi cao nhất Việt Nam. Vì thèm muốn được đến gần những ngọn núi tuyết của dãy Himalaya, chúng mình đã tới Ladakh, nơi có cảnh quan, con người đẹp tuyệt vời.
            //   </div>
            // https://drive.google.com/drive/folders/16yvJX2PvUBzHUz-GPArj3OcdKK0KcLcR
            // </div>

            
        
    )
}