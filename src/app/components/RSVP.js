"use client";

import { useState } from 'react';
import styles from '../page.module.css';
import localFont from 'next/font/local'
import Button from './Button';

const svnhcFont = localFont({ src: '../fonts/SVN_HC_Elixir_Sans.otf'})
const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})

export default function RSVP(props) {
    const [name, setName] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mode, setMode] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [isMoreThanOne, setIsMoreThanOne] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    function switchMode(callback) {
        setShowForm(true);
        setMode(1);
        setTimeout(() => {
            callback();
        }, 500);
    }

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    async function sendResponse(callback) {
        console.log("sending response ...");
        if (name === null || name === "") {
            setErrorMsg("Vui lòng điền tên của bạn");
            callback();
        }
        else if (quantity === null) {
            setErrorMsg("Vui lòng chọn số lượng người");
            callback();
        }
        else {
            try {
                const response = await fetch("https://ekyc-dev-internal.kalapa.vn/lw/rsvp?user_name=" + name + "&quantity=" + quantity, {
                    method: "POST"                
                });
                console.log(response.status);
                if (response.status == 422) {
                    setErrorMsg("Số lượng người phải là một số nguyên");
                    callback();
                }
                else if (response.status == 200) {
                    let data = await response.json();
                    console.log(data);
                    let newID = makeid(32);
                    console.log("generating wedding ID ...", newID);
                    localStorage.setItem("myWeddingID", newID);
                    
                    callback();
                    setTimeout(props.onCancelRSVP, 200);
                }   
                else {
                    alert("Something went wrong. Please try again later.");
                    callback();
                }         
            }
            catch (error) {
                alert("Something went wrong. Please try again later.");
                callback();
            }
        } 
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
                style={{"height": "min(11vh, 15vw)",
                        "backgroundColor": "#3D461C",
                        "display": "flex",
                        "justifyContent": "center",
                        alignItems: "center",
                        marginTop: -1,
                        "borderRadius": "min(4vh, 5vw) min(4vh, 5vw) 0px 0px"}}>
                {showForm ? <img src="/text4.png" style={{height: "60%", maxWidth: "90%"}}></img> : <img src="/text3.png" style={{height: "60%", maxWidth: "90%"}}></img>}
                
            </div>
            <br></br>
            <div className={dalatFont.className} style={{"textAlign": "center", "color": "#3D461C"}}>

                {
                    mode == 0 ? (
                        <>
                        <p style={{"fontSize": "min(3vh, 5vw)", padding: "0 20px"}}>tới dự hôn lễ của vợ chồng chúng mình</p>
                        <br></br>
                        <div style={{margin: "0px 20px", position: "relative", height: "min(30vh, 50vw)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <div className={styles.bgCircle}></div>
                            <p style={{"fontSize": "min(3vh, 5vw)"}}>vào hồi</p>
                            <p style={{"fontSize": "min(11vh, 20vw)"}}>{props.side != "hanh" ? "10:00" : "17:30"}</p>
                            <p style={{"fontSize": "min(6vh, 8vw)"}}>{props.side != "hanh" ? "thứ 7 ngày 02 tháng 12" : "Chủ Nhật ngày 03/12"}</p>
                            <p style={{"fontSize": "min(3vh, 5vw)"}}>tại</p>
                        </div>
                        <br></br>
                        <p style={{"fontSize": "min(3vh, 6vw)", padding: "0 20px"}}>{props.side != "hanh" ? "nhà văn hóa cụm 6, thôn Phan Long, xã Tân Hội, huyện Đan Phượng, thành phố Hà Nội" : "trung tâm tiệc cưới Trống Đồng Palace, số 65 Quán Sứ, Hoàn Kiếm, Hà Nội"}</p>
                        <br></br>

                        <div style={{width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                            <Button
                                font="dalat"
                                fontSize={"min(3.5vh, 6vw)"}
                                bgColor="#3D461C"
                                color="#F6EAD1"
                                height="min(8vh, 12vw)"
                                width="min(28vh, 45vw)"
                                content="Tôi sẽ tham dự"
                                handleClick={switchMode}
                            />
                        </div>
                        <p
                            style={{
                                fontSize: "min(3vh, 5vw)", marginTop: 10, cursor: "pointer",
                                fontWeight: 600, textDecoration: "underline",
                                marginBottom: 30
                            }}
                            onClick={props.onCancelRSVP}
                        >Bỏ qua</p>


                        </>
                    )
                    : (
                        <div style={{"textAlign": "center", display: "flex", minHeight: "55vh", flexDirection: "column", alignItems: "center"}}>
                            <p style={{"fontSize": "min(3vh, 5vw)", width: "90%", marginBottom: "min(3vh, 4vw)"}}>Xin cho chúng mình biết thông tin của bạn để được đón tiếp một cách chu đáo nhất nhé!</p>
                            <div style={{width: "80%", height: "min(5vh, 10vw)", display: "flex", alignItems: "center", color: "#3D461C",  position: "relative", marginBottom: "min(2vh, 4vw)"}}>
                                <label style={{fontSize: "min(2.5vh, 5vw)", position: "absolute", top: -10, left: 10, padding: "0px 10px", backgroundColor: "#f6ead1"}}>Tên của bạn</label>
                                <input onChange={updateName} type={"text"} className={styles.myInput + " " + dalatFont.className}></input>
                            </div>

                            <div style={{width: "80%", textAlign: "left"}}>
                                <div style={{display: "flex", alignItems: "center", marginBottom: 16}}>
                                    <input className='myRadioInput' name="alksdjf" onClick={() => {updateIsMoreThanOne(0)}} 
                                            style={{height: "min(2vh, 5vw)", width: "min(2vh, 5vw)"}} type={"radio"} checked={!isMoreThanOne}></input> 
                                    <label onClick={() => {updateIsMoreThanOne(0)}} style={{cursor: "pointer", fontSize: "min(2.5vh, 6vw)", marginLeft: 10 }}>Tôi sẽ đến một mình</label>
                                </div>
                                <div style={{display: "flex", alignItems: "center", marginBottom: "min(2vh, 3vw)"}}>
                                    <input className='myRadioInput' name="alksdjf" onClick={() => {updateIsMoreThanOne(1)}} 
                                            style={{height: "min(2vh, 5vw)", width: "min(2vh, 5vw)"}} type={"radio"} checked={isMoreThanOne}></input> 
                                    <label onClick={() => {updateIsMoreThanOne(1)}} style={{cursor: "pointer", fontSize: "min(2.5vh, 6vw)", marginLeft: 10 }}>Tôi sẽ đến cùng người thân</label>
                                </div>
                            </div>

                            {
                                isMoreThanOne &&
                                <div style={{width: "80%", height: "min(5vh, 10vw)", display: "flex", alignItems: "center", position: "relative", marginBottom: "min(2vh, 4vw)"}}>
                                    <label style={{fontSize: "min(2.5vh, 5vw)", position: "absolute", top: -10, left: 10, padding: "0px 10px", backgroundColor: "#f6ead1"}}>Số người đi cùng</label>
                                    <input onChange={updateQuantity} type={"text"} className={styles.myInput + " " + dalatFont.className}></input>
                                </div>
                            }

                            <div style={{width: "80%", textAlign: "left"}}>
                                <Button
                                    font="dalat"
                                    fontSize={"min(3.5vh, 6vw)"}
                                    bgColor="#3D461C"
                                    color="#F6EAD1"
                                    height="min(8vh, 12vw)"
                                    width="min(28vh, 45vw)"
                                    content="Xác nhận"
                                    handleClick={sendResponse}
                                />
                                {
                                    errorMsg !== null && 
                                        <p style={{color: "red", fontSize: "min(2.5vh, 5vw)", marginTop: "0.5vw"}}>{errorMsg}</p>
                                }
                            </div>
                        </div>
                    )
                }

                <img style={{position: "absolute", bottom: 0, left: 0, borderRadius: "0 0 min(4vh, 5vw) min(4vh, 5vw)", width: "min(12vh, 15vw)", height: "min(12vh, 15vw)"}} alt="rsvpImage1" src="/rsvpImg1.png"/>
                <img style={{position: "absolute", bottom: 0, right: 0, borderRadius: "0 0 min(4vh, 5vw) 0", width: "min(12vh, 15vw)", height: "min(12vh, 15vw)"}} alt="rsvpImage1" src="/rsvpImg.png"/>
            </div>
        </div>
    )
}