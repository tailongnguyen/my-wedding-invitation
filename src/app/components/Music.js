"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '../page.module.css';
import localFont from 'next/font/local';
import Link from "next/link";
import Button from './Button';

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})
const dalatCapFont = localFont({ src: '../fonts/MTDalatSansCapRegular-Ver1.1.otf'})
const font7 = localFont({ src: '../fonts/SVN_HC_Elixir_Sans.otf'});
const domain = "https://ekyc-dev-internal.kalapa.vn/lw";
// const domain = "http://localhost:16197";
let timer;

export default function Music(props) {

    const inputRef = useRef(null);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [track, setTrack] = useState(null);
    const [foundTracks, setFoundTracks] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [topTracks, setTopTracks] = useState([]);
    const [nextable, setNextable] = useState(true);
    const [offset, setOffset] = useState(0);

    async function searchTrack(track) {
        setIsSearching(true);
        setSubmitStatus(null);
        setTrack(null);
        setFoundTracks(null);
        const url = 'https://spotify23.p.rapidapi.com/search/?q=' + track +  '&type=tracks&offset=0&limit=10&numberOfTopResults=5';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8465186f9fmsh0afdea2074a329ap15070fjsn2764fa09f307',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            let tracks = [];
            result.tracks.items.map(x => {
                try {
                    tracks.push({
                        _name: x.data?.name,
                        _artist: x.data?.artists?.items.map(y => y.profile.name).join(" - ")
                    })
                }
                catch (error) {
                    console.log(error);
                }
            })
            console.log(tracks);
            setFoundTracks(tracks);
            setIsSearching(false);
        } catch (error) {
            console.error(error);
        }

        // setTimeout(() => {
        //     let result = _foundTracks;
        //     let tracks = [];
        //     result.tracks.items.map(x => {
        //         try {
        //             tracks.push({
        //                 _name: x.data?.name,
        //                 _artist: x.data?.artists?.items.map(y => y.profile.name).join(" - ")
        //             })
        //         }
        //         catch (error) {
        //             console.log(error);
        //         }
        //     })
        //     console.log(tracks);
        //     setFoundTracks(tracks);
        //     setIsSearching(false);
        // }, 1000)        
        
    }

    async function getTopTracks(_offset) {
        try {
            const response = await fetch(domain + "/track?offset=" + _offset + "&side=" + props.side, {
                method: "GET"                
            });
            if (response.status != 200) {
                alert("Something went wrong. Please try again later.");
                callback();
            }
            else {
                let data = await response.json();
                let _topTracks = data.data.map(x => [x.track + " | " + x.artist, x.vote]);
                console.log(_topTracks);
                setTopTracks(_topTracks);
                if (_topTracks.length < 10) {
                    setNextable(false);
                }
                else {
                    setNextable(true);
                }
            }            
        }
        catch (error) {
            alert("Something went wrong. Please try again later.");
            callback();
        }
    }

    useEffect(() => {
        getTopTracks(0);
        inputRef.current.addEventListener('keyup', event => {
            clearTimeout(timer);
          
            timer = setTimeout(() => {
              searchTrack(event.target.value);
            }, 1000);
        });
        
    }, []);

    function chooseTrack(x) {
        setTrack(x);
        inputRef.current.value = x._name + " | " + x._artist;
    }

    async function submitTrack(callback) {
        console.log("sending response ...");
        try {
            const response = await fetch(domain + "/track?track=" + track._name + "&artist=" + track._artist + "&side=" + props.side, {
                method: "POST"                
            });
            if (response.status != 200) {
                alert("Something went wrong. Please try again later.");
                setSubmitStatus(false);
                callback();
            }
            else {
                let data = await response.json();
                console.log(data);
                setOffset(0);
                await getTopTracks(0);
                setFoundTracks(null);
                setTrack(null);
                setSubmitStatus(true);
                callback();
                inputRef.current.value = "";
            }            
        }
        catch (error) {
            alert("Something went wrong. Please try again later.");
            setSubmitStatus(false);
            callback();
        }
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

          <div style={{position: "absolute", right: "5vw", zIndex: 5, width: props.mode == 1 ? "55vw" : "55vw", paddingTop: "1vw"}}>
            <p className={font7.className + " " + styles.textStyle3} style={{fontSize: "min(6vh, 5vw)", maxWidth: props.mode == 0 ? "70vw" : "50vw"}}>
                Bạn muốn nghe bài hát gì tại đám cưới?
            </p>
            <div style={{marginTop: "2vw", marginBottom: "3vw"}}>
                <input ref={inputRef} type="text" className={styles.myInput + " " + dalatFont.className} placeholder="Điền tên bài hát bạn thích" style={{height: "min(7vh, 7vw)", marginBottom: "1vw", fontSize: "min(3vh, 2.8vw)",  float: "left", borderWidth: props.mode == 0 ? 2 : 1, borderRadius: "min(1.5vh, 1vw)", marginRight: "2vw", width: "min(40vh, 50vw)"}}/>                
                {
                    isSearching ? <div style={{paddingTop: "0.2vw"}} ><span className={styles.loader}></span></div> :
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
                        disabled={track === null}
                    />
                }
                {
                    submitStatus !== null && <p style={{fontSize: "min(3vh, 3vw)", marginTop: "1vw", color: submitStatus ? "green" : "red"}} >{submitStatus ? "Bạn vừa đăng ký thành công!" : "Có lỗi xảy ra. Vui lòng thử lại sau."}</p>
                }
            </div>
            {
                props.mode == 0 &&
                <div style={{color: "#532E18", marginTop: "1vw"}}>
                    <p className={font7.className} style={{fontSize: "min(5vh, 5vw)", marginBottom: "2vw",}}>
                        {foundTracks === null ? "Danh sách bài hát được đăng ký" : "Kết quả tìm kiếm"}
                    </p>
                    {   foundTracks === null ?
                            topTracks.map((x, i) => 
                            <div key={i} onClick={() => {
                                let splits = x[0].split(" | ");
                                chooseTrack({
                                    _name: splits[0],
                                    _artist: splits[1]
                                })
                            }} className={styles.track}>
                                <span className={dalatCapFont.className + " " + styles.trackName}>{i + 1 + offset}. {x[0]}</span>
                                <span style={{float: "right", fontSize: "min(2.5vh, 2.5vw)"}}>{x[1]} lượt</span>
                            </div>)
                        :
                            foundTracks.map((x, i) => 
                            <div key={i} onClick={() => {chooseTrack(x)}} className={styles.track}>
                                <span className={dalatCapFont.className + " " + styles.trackName}>{i + 1}. {x._name}</span>
                                <span style={{float: "right", fontSize: "min(2.5vh, 2.5vw)"}}>{x._artist}</span>
                            </div>)
                    }
                    
                    <div className={dalatCapFont.className} style={{paddingTop: "1.5vw"}}>
                        {
                            offset > 0 &&
                            <span onClick={() => {
                                getTopTracks(offset - 10);
                                setOffset(offset - 10);
                            }} style={{textDecoration: "underline", marginRight: "0.5vw", cursor: "pointer", color: "#3D461C", fontSize: "min(2vh, 2vw)"}}>{"<< Trang trước"}</span>
                        }
                        {
                            nextable &&
                            <span onClick={() => {
                                getTopTracks(offset + 10);
                                setOffset(offset + 10);                                
                            }} style={{textDecoration: "underline", cursor: "pointer", color: "#3D461C", fontSize: "min(2vh, 2vw)"}}>{"Trang tiếp theo >>"}</span>
                        }
                    </div>
                </div>
            }            
          </div>
          { props.mode == 1 &&
            <div style={{position: "absolute", marginTop: "10vw", color: "#532E18", width: "90vw"}}>
                <img src="disc.png" style={{width: "50vw"}}></img>
                <div style={{marginLeft: "10vw"}}>
                    <p className={font7.className} style={{fontSize: "min(5vh, 5vw)", marginBottom: "2vw",}}>
                        {foundTracks === null ? "Danh sách bài hát được đăng ký" : "Kết quả tìm kiếm"}
                    </p>

                    {   foundTracks === null ?
                            topTracks.map((x, i) => 
                            <div onClick={() => {
                                let splits = x[0].split(" | ");
                                chooseTrack({
                                    _name: splits[0],
                                    _artist: splits[1]
                                })
                            }} key={i} className={styles.track}>
                                <span className={dalatCapFont.className + " " + styles.trackName}>{i + 1 + offset}. {x[0]}</span>
                                <span style={{float: "right", fontSize: "min(2.5vh, 2.5vw)"}}>{x[1]} lượt</span>
                            </div>)
                        :
                            foundTracks.map((x, i) => 
                            <div key={i} onClick={() => {chooseTrack(x)}} className={styles.track}>
                                <span className={dalatCapFont.className + " " + styles.trackName}>{i + 1}. {x._name}</span>
                                <span style={{float: "right", fontSize: "min(2.5vh, 2.5vw)"}}>{x._artist}</span>
                            </div>)
                    }

                    <div className={dalatCapFont.className} style={{paddingTop: "1.5vw"}}>
                        {
                            offset > 0 &&
                            <span onClick={() => {
                                getTopTracks(offset - 10);
                                setOffset(offset - 10);
                            }} style={{textDecoration: "underline", marginRight: "0.5vw", cursor: "pointer", color: "#3D461C", fontSize: "min(2vh, 2vw)"}}>{"<< Trang trước"}</span>
                        }
                        {
                            nextable &&
                            <span onClick={() => {
                                getTopTracks(offset + 10);
                                setOffset(offset + 10);                                
                            }} style={{textDecoration: "underline", cursor: "pointer", color: "#3D461C", fontSize: "min(2vh, 2vw)"}}>{"Trang tiếp theo >>"}</span>
                        }
                    </div>
                </div>
            </div>
          }
        </div>
    )
}