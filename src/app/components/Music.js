"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '../page.module.css';
import localFont from 'next/font/local';
import Link from "next/link";
import Button from './Button';

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})
const dalatCapFont = localFont({ src: '../fonts/MTDalatSansCapRegular-Ver1.1.otf'})
const font7 = localFont({ src: '../fonts/SVN_HC_Elixir_Sans.otf'});

export default function Music(props) {

    const [topTracks, setTopTracks] = useState([
        ["Bạn đời | Karik x GDUCky", 21],
        ["chuyện của mùa đông | hà anh tuấn", 19],
        ["Một nhà | Dalab", 16],        
        ["Hơn cả yêu | Đức phúc", 14],
        ["Xứng đôi yêu thôi | lê thiện hiếu", 10],
        ["perfect | ed sheeran", 8],
        ["rồi tới luôn | Nal", 7],
        ["đã xem | ngọt", 5],
        ["Marry you | bruno mars", 5],
        ["Until i found you | stephen sanchez", 3]
    ])
    useEffect(() => {
      
    }, []);

    function submitTrack() {

    }

    return (
        <div 
            className={dalatFont.className}
            style={{"height": "100%", backgroundColor: "#FFE8D2"}}
        >
          <img src="image 9.png" style={{position: "absolute", width: "24vw"}}></img>          
          {
              props.mode == 0 && <img src="disc.png" style={{position: "absolute", marginTop: "10vw", width: "50vw"}}></img>
          }

          <div style={{position: "absolute", right: "5vw", maxWidth: props.mode == 1 ? "55vw" : "70vw", paddingTop: "1vw"}}>
            <p className={font7.className + " " + styles.textStyle3} style={{fontSize: "min(6vh, 5vw)", maxWidth: props.mode == 0 ? "70vw" : "50vw"}}>
                Bạn muốn nghe bài hát gì tại đám cưới?
            </p>
            <div style={{marginTop: "2vw"}}>
                <input type="text" className={styles.myInput + " " + dalatFont.className} placeholder="Điền tên bài hát bạn thích" style={{height: "min(7vh, 7vw)", marginBottom: "1vw", fontSize: "min(3vh, 2.8vw)",  float: "left", borderWidth: props.mode == 0 ? 2 : 1, borderRadius: "min(1.5vh, 1vw)", marginRight: "2vw", width: "min(40vh, 50vw)"}}/>                
                <Button
                    font="dalat"
                    fontSize={"min(3.5vh, 3.5vw)"}
                    bgColor="#3D461C"
                    color="#F6EAD1"
                    height="min(7vh, 7vw)"
                    width="min(35vh, 35vw)"
                    content="Đăng ký bài hát"
                    handleClick={submitTrack}
                    iconSrc="send.png"
                />
            </div>
            {
                props.mode == 0 &&
                <div style={{color: "#532E18", marginTop: "1vw"}}>
                    <p className={font7.className} style={{fontSize: "min(5vh, 5vw)", marginBottom: "2vw",}}>
                        Top 10 bài đang được đăng ký nhiều nhất
                    </p>
                    {
                        topTracks.map((x, i) => 
                        <div key={i} style={{marginTop: "0.5vw", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span className={dalatCapFont.className} style={{fontSize: "min(3vh, 2.8vw)"}}>{i + 1}. {x[0]}</span>
                            <span style={{float: "right", fontSize: "min(2.5vh, 2.5vw)"}}>{x[1]} lượt</span>
                        </div>)
                    }
                </div>
            }
          </div>
          {props.mode == 1 &&
            <div style={{position: "absolute", marginTop: "10vw", color: "#532E18", width: "90vw"}}>
                <img src="disc.png" style={{width: "50vw"}}></img>
                <div style={{marginLeft: "10vw"}}>
                    <p className={font7.className} style={{fontSize: "min(5vh, 5vw)", marginBottom: "2vw",}}>
                        Top 10 bài đang được đăng ký nhiều nhất
                    </p>

                    {
                        topTracks.map((x, i) => 
                        <div key={i} style={{marginTop: "0.5vw", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <span className={dalatCapFont.className} style={{fontSize: "min(3vh, 2.8vw)"}}>{i + 1}. {x[0]}</span>
                            <span style={{float: "right", fontSize: "min(2.5vh, 2.5vw)"}}>{x[1]} lượt</span>
                        </div>)
                    }
                </div>
            </div>
          }
        </div>
    )
}