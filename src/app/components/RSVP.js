"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from '../page.module.css';
import localFont from 'next/font/local'
import Button from './Button';

const svnhcFont = localFont({ src: '../fonts/SVN_HC_Elixir_Sans.otf'})
const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})

export default function RSVP(props) {
    const [name, setName] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mode, setMode] = useState(0);
    const [title, setTitle] = useState("TRÂN TRỌNG KÍNH MỜI");
    const [isMoreThanOne, setIsMoreThanOne] = useState(false);

      
    function switchMode(callback) {
        setTitle("TOẸT CÀ LÀ VỜI");
        setMode(1);
        setTimeout(() => {
            callback();
        }, 500);
    }

    function sendResponse(callback) {
        console.log("sending response ...");
        
        setTimeout(callback, 2000);
    }

    function updateIsMoreThanOne(mode) {
        if (mode == 0) {
            setIsMoreThanOne(false);
        }
        else {
            setIsMoreThanOne(true);
        }        
    }

    function updateName(event) {
        console.log(event.target.value);
        setName(event.target.value);
    }

    function updateQuantity(event) {
        console.log(event.target.value);
        setQuantity(parseInt(event.target.value));
    }

    return (
        <div className={styles.rsvp}>
            <div className={svnhcFont.className}
                style={{"height": "80px",
                        "backgroundColor": "#3D461C",
                        "display": "flex",
                        "justifyContent": "center",
                        alignItems: "center",
                        marginTop: -1,
                        "borderRadius": " 30px 30px 0px 0px"}}>
                <h2 className={styles.textStyle1}>{title}</h2>
            </div>
            <br></br>
            <div className={dalatFont.className} style={{"textAlign": "center", "color": "#3D461C"}}>

                {
                    mode == 0 ? (
                        <>
                        <p style={{"fontSize": 24}}>tới dự hôn lễ của vợ chồng chúng mình</p>
                        <br></br>
                        <div style={{margin: "0px 20px", position: "relative", height: "225px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <div className={styles.bgCircle}></div>
                            <p style={{"fontSize": 20}}>vào hồi</p>
                            <p style={{"fontSize": 90}}>10:30</p>
                            <p style={{"fontSize": 40}}>thứ 7 ngày 02 tháng 12</p>
                            <p style={{"fontSize": 20}}>tại</p>
                        </div>
                        <br></br>
                        <p style={{"fontSize":24}}>nhà văn hóa cụm 6, thôn Phan Long, xã Tân Hội, huyện Đan Phượng, thành phố Hà Nội</p>
                        <br></br>

                        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Button
                                font="dalat"
                                fontSize={24}
                                bgColor="#3D461C"
                                color="#F6EAD1"
                                content="Tôi sẽ tham dự"
                                handleClick={switchMode}
                            />
                        </div>
                        <p
                            style={{
                                fontSize: 20, marginTop: 10, cursor: "pointer",
                                fontWeight: 600, textDecoration: "underline",
                                marginBottom: 30
                            }}
                            onClick={props.onCancelRSVP}
                        >Bỏ qua</p>


                        </>
                    )
                    : (
                        <div style={{"textAlign": "center", display: "flex", minHeight: 500, flexDirection: "column", alignItems: "center"}}>
                            <p style={{"fontSize": 24, width: "90%", marginBottom: 20}}>Xin cho chúng mình biết thông tin của bạn để được đón tiếp một cách chu đáo nhất nhé!</p>
                            <div style={{width: "80%", height: 50, display: "flex", alignItems: "center", position: "relative", marginBottom: 40}}>
                                <label style={{fontSize: 20, position: "absolute", top: -10, left: 10, padding: "0px 10px", backgroundColor: "#f6ead1"}}>Tên của bạn</label>
                                <input onChange={updateName} type={"text"} className={styles.myInput + " " + dalatFont.className}></input>
                            </div>

                            <div style={{width: "80%", textAlign: "left"}}>
                                <div style={{display: "flex", alignItems: "center", marginBottom: 16}}>
                                    <input className='myRadioInput' name="alksdjf" onClick={() => {updateIsMoreThanOne(0)}} style={{height: 16, width: 16}} type={"radio"}></input> <label style={{fontSize: 20, marginLeft: 10 }}>Tôi sẽ đến một mình</label>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginBottom: 16}}>
                                    <input className='myRadioInput' name="alksdjf" onClick={() => {updateIsMoreThanOne(1)}} style={{height: 16, width: 16}} type={"radio"}></input> <label style={{fontSize: 20, marginLeft: 10 }}>Tôi sẽ đến cùng người thân</label>
                                </div>
                            </div>

                            {
                                isMoreThanOne &&
                                <div style={{width: "80%", height: 50, display: "flex", alignItems: "center", position: "relative", marginBottom: 20}}>
                                    <label style={{fontSize: 20, position: "absolute", top: -10, left: 10, padding: "0px 10px", backgroundColor: "#f6ead1"}}>Số người đi cùng</label>
                                    <input onChange={updateQuantity} type={"text"} className={styles.myInput + " " + dalatFont.className}></input>
                                </div>
                            }

                            <div style={{width: "80%", textAlign: "left"}}>
                                <Button
                                    font="dalat"
                                    fontSize={24}
                                    bgColor="#3D461C"
                                    color="#F6EAD1"
                                    content="Xác nhận"
                                    handleClick={sendResponse}
                                />
                            </div>
                        </div>
                    )
                }

                <Image style={{position: "absolute", bottom: 0, left: 0, borderRadius: "0 0 0 30px"}} alt="rsvpImage1" src="/rsvpImg1.png" width={100} height={100}/>
                <Image style={{position: "absolute", bottom: 0, right: 0, borderRadius: "0 0 30px 0"}} alt="rsvpImage1" src="/rsvpImg.png" width={100} height={100}/>
            </div>
        </div>
    )
}