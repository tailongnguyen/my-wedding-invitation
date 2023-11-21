"use client";

import styles from './page.module.css'
import localFont from 'next/font/local'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useState, useEffect, useRef } from 'react';
import RSVP from './components/RSVP';
import NavBar from './components/NavBar';
import Interview from "./components/Interview";
import OurStory from './components/OurStory';
import Photos from './components/Photos';
import Music from './components/Music';
import Map from './components/Map';

const font1 = localFont({ src: './fonts/font-doc-lap.otf'});
const font2 = localFont({ src: './fonts/iCielBCDowntown-Regular.otf'});
const font3 = localFont({ src: './fonts/iCielBCRostrum-Regular.otf'});
const font4 = localFont({ src: './fonts/UTM-Brewers-KT.ttf'});
const font5 = localFont({ src: './fonts/UTM-Guanine.ttf'});
const font6 = localFont({ src: './fonts/MTDalatSansCapRegular-Ver1.1.otf'});
const font7 = localFont({ src: './fonts/SVN_HC_Elixir_Sans.otf'});
const font8 = localFont({ src: './fonts/MTDalatSans.otf'});

export default function Home() {
  const [mode, setMode] = useState(0);
  const [side, setSide] = useState(null);
  const [rsvpOpacity, setRsvpOpacity] = useState(1);
  const [_isMobile, setIsMobile] = useState(false);
  const [bigPhoto, setBigPhoto] = useState(null);
  const [isComeBack, setIsComeBack] = useState(null);

  function cancelRSVP() {
    setRsvpOpacity(0.0)
    window.scrollTo(0, 0);
    setTimeout(() => {
      setMode(1);
    }, 800);    
  }


  useEffect(() => {
    console.log("is mobile?", isMobile);
    const urlParams = new URLSearchParams(window.location.search);
    let side = urlParams.get("side");
    if (side == null) {
      side = "long";
    }
    setSide(side);
    setIsMobile(isMobile);

    const _myWeddingID = localStorage.getItem("myWeddingID");
    console.log("weddingID", _myWeddingID);
    // alert(_myWeddingID);
    if (_myWeddingID !== null) {
      setRsvpOpacity(0.0);
      setMode(1);      
    }
    
    // if (isMobile) {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: "smooth",
    //   });
    // }
  })

  function showBigPhoto(imagePath) {
    setBigPhoto(imagePath);
  }

  function hideBigPhoto() {
    setIsComeBack(bigPhoto);
    setBigPhoto(null);
  }  

  return (
    <div>
      <div id="main" className={styles.main}>
        { bigPhoto == null &&
          <NavBar isComeBack={isComeBack} mode={mode}/>
        }
        {
          (bigPhoto == null  && (!_isMobile || mode == 1)) ? 
          <img 
            alt="backgroundImage"
            src={side != "hanh" ? '/4890E3A0-0DEB-4D09-8FE6-F9B0EFD71A80_1_105_c 1.png' : '1O5A5902.jpg'}
            style={{width: "100%"}}
          /> : bigPhoto == null ?
          <img 
            alt="backgroundImage"
            src={"/Rectangle 34.png"}
            style={{width: "100%", objectFit: "cover", height: "100vh"}}
          />
          : <></>
        }
        
      {mode == 0 ?
        <div id="rsvp" style={{opacity: rsvpOpacity, transition: "opacity 1s"}}>          
            <RSVP side={side} onCancelRSVP={cancelRSVP}/>                      
        </div>
        : bigPhoto != null ? 
        <div style={{backgroundColor: "#e9e9e96b", height: "100vh", width: "100vw", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", position: "fixed"}}>
          <p className={font6.className} style={{fontSize: "min(4vh, 4vw)", textAlign: "center", color:"#E29F00", position: "absolute", top: "5vh", left: "50%", transform: "translateX(-50%)"}}>
            Bấm vào ảnh để quay lại</p>            
          <img src={bigPhoto} onClick={hideBigPhoto}  style={{maxWidth: "80vw", maxHeight: "80vh", cursor: "pointer", border: "min(1vh, 0.8vw) solid #F6EAD1"}}></img>
        </div> 
        :
        <div>          
          <div style={{opacity: 1 - rsvpOpacity, transition: "opacity 2s"}}>            
            <div style={{position: "absolute", top: "min(10vw, 100px)", left: "5%"}}>
              <p style={{fontSize: "min(6.5vh, 3.5vw)", color: "#E29F00"}} className={font5.className}>Đám cưới</p>
              <p style={{fontSize: "min(6.5vh, 3.5vw)", color: "#E29F00"}} className={font5.className}>Hà Thành</p>
            </div>

            <div style={{position: "absolute", top: "40vw", left: "5%"}}>
              <div>
                <span style={{fontSize: "min(3.5vh, 2.5vw)", color: "#F6EAD1", marginRight: "2vw"}} className={font8.className}>[Boston]</span>
                <span style={{fontSize: "min(8vh, 5.5vw)", color: "#A21F17"}} className={font7.className}>LỜi Tình</span>
              </div>
              <p style={{fontSize: "min(3.5vh, 2.5vw)", color: "#F6EAD1"}} className={font8.className}>của Ánh Bằng - Thanh Lan</p>
            </div>            

            <div style={{position: "absolute", textAlign: "right", top: "min(12vw, 100px)", right: "5%"}}>
              <p style={{fontSize: "min(8vh, 4vw)"}} className={font3.className + " " + styles.textStyle2}>Khúc Ca</p>
              <p style={{fontSize: "min(8vh, 4vw)"}} className={font3.className + " " + styles.textStyle2}>Tình Sâu</p>
              <p style={{fontSize: "min(3vh, 1.8vw)", color: "#F6EAD1"}} className={font6.className}>Hà Thanh</p>
            </div>

            <div style={{position: "absolute", textAlign: "right", top: "40vw", right: "5%"}}>
              <p style={{fontSize: "min(8vh, 5vw)", color: "#3D461C", textShadow: "-3px 2px 0px #E19E00"}} className={font1.className}>ĐÊM NhỚ</p>
              <p style={{fontSize: "min(8vh, 5vw)", color: "#3D461C", textShadow: "-3px 2px 0px #E19E00"}} className={font1.className}>NGÀY MONG</p>
              <p style={{fontSize: "min(3.5vh, 2.5vw)", color: "#FFE8D2"}} className={font1.className}>THANH TUYỀN</p>
            </div>
          </div>

          <div style={{height: "88vw", backgroundColor: "#F6E9D1", position: "relative", marginTop: "-1vw"}}>
            <div style={{position: "absolute", top: "-12vw", left: "5%"}}>
              <p style={{fontSize: "min(5vh, 3.5vw)", color: "#F6EAD1"}} className={font4.className}>Thanh xuân của chúng ta</p>
              <p style={{fontSize: "min(3.5vh, 2.5vw)", marginTop: "1vw", color: "#E29F00"}} className={font2.className}>Bùi Anh Tuấn và Bảo Anh</p>
            </div>
            <img src="/image 1.png" style={{opacity: _isMobile ? 0.5 : 1, width: "20vw", height: "20vw", position: "absolute", left: 0, top: 0}}/>
            <img src="/image 5.png" style={{opacity: _isMobile ? 0.5 : 1, zIndex: 2, width: "20vw", position: "absolute", left: 0, top: "20vw"}}/>
            <img src="/image 2.png" style={{opacity: _isMobile ? 0.5 : 1, width: "20vw", height: "20vw", position: "absolute", right: 0, top: 0}}/>
            <img src="/image 6.png" style={{opacity: _isMobile ? 0.5 : 1, zIndex: 2, width: "20vw", position: "absolute", right: 0, top: "20vw"}}/>

            <p className={styles.textStyle2 + " " + font7.className} style={{textAlign: "center", paddingTop: "2vw", fontSize: "min(7vh, 5vw)"}}>VỚi SỰ THAM GiA CỦA</p>

            <Interview mode={0} image="./Ellipse 4.png" 
              content1="CÔ DÂU" 
              content2="NGUYỄN THU HẠNH"
              content3="EM CHƯA MUỐN LẤY CHỒNG"
              content4="Đùa thôi, chồng mình chăm đưa mình đi chơi, đi khám phá, điều đó làm mình rất hạnh phúc. Phải nhanh chống hoàn thành KPI 2 đứa để còn đi tiếp hahaha."
            />
            <div className={styles.abc} ></div>
            <Interview mode={1} image="./Ellipse 5.png" 
              content1="CHÚ RỂ" 
              content2="NGUYỄN TÀI LONG"
              content3="MÌNH SỤT 1KG VÌ CÁI WEB NÀY"
              content4="Nhưng mà vui, việc chuẩn bị cho đám cưới là một trải nghiệm thú vị. Từ thiết kế, lên ý tưởng, tự tay làm những món đồ trang trí đối với mình là một việc thật ngầu và ý nghĩa."
            />            
          </div>
          
          <div id="our-story">
            <OurStory activePhoto={isComeBack} onPhotoClick={showBigPhoto} />
          </div>
          <div id="wedding-photo" style={{position: "relative", height: _isMobile ? "auto" : "53vw"}}>
            <Photos 
              bgImage="./Rectangle 34.png"
              image="./Rectangle 32.png"
              link="https://drive.google.com/drive/folders/1R3NtCdHZj4-TKydi79gJ6aAstNtH61Fb"
              content1="LADAKH"
              content2="Cả hai đứa mình đều mê núi rừng, đã cùng nhau leo 3/4 đỉnh núi cao nhất Việt Nam. Vì thèm muốn được đến gần những ngọn núi tuyết của dãy Himalaya, chúng mình đã tới Ladakh, nơi có cảnh quan, con người đẹp tuyệt vời."
              mode={_isMobile ? "center": "left"}
            />

            <Photos 
              bgImage="./Rectangle 35.png"
              image="./Rectangle 33.png"
              link="https://drive.google.com/drive/folders/1GAp2LVLFfAfkpf3ezrCBQvEDKUapPMEm"
              content1="HÀ NỘI"
              content2="Nàng là người Hà Nội gốc, chàng là người Hà Nội 2. Do đó, nét đẹp của phố phường và con người Hà Nội là một niềm đam mê chung của hai đứa từ những ngày đầu hẹn hò. Đi đâu xa vài ba ngày là lại than với nhau là nhớ Hà Nội quá.."
              mode={_isMobile ? "center": "right"}
            />

            <div style={{width: "30vw", position: "absolute", right: 0, zIndex: 3, top: "-5vw"}}>
              <img src="./image 7.png" style={{width: "100%"}}></img>
            </div>
          </div>

          <div id="music" style={{height: _isMobile ? "120vw" : "60vw"}}>
            <Music side={side} mode={_isMobile ? 1 : 0} />
          </div>

          <div id="map"  style={{height: _isMobile ? "120vw" : "100vw"}}>
            <Map side={side} />
          </div>
        </div>
      }
      
      
      </div>
    
    </div>


  )
}
