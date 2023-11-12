"use client";

import Image from 'next/image'
import styles from './page.module.css'
import localFont from 'next/font/local'

import { useState } from 'react';
import RSVP from './components/RSVP';
import NavBar from './components/NavBar';

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
  const [rsvpOpacity, setRsvpOpacity] = useState(1);
  
  function cancelRSVP() {
    setRsvpOpacity(0.0)
    setTimeout(() => {
      setMode(1);
    }, 800);    
  }

  // const _myWeddingID = localStorage.getItem("myWeddingID");
  // alert(_myWeddingID);
  // if (_myWeddingID === null) {
  //   alert("generating ID ...");
  //   localStorage.setItem("myWeddingID", 'klajsdklfjalsdf')
  // }
        

  return (
    <div>
      <div className={styles.main}>
        <NavBar mode={mode}/>
        <img 
          alt="backgroundImage"
          src='/IMG_1697379292464.jpg'
          style={{"width": "100%"}}        
        />
      {mode == 0 ?
        <div style={{opacity: rsvpOpacity, transition: "opacity 1s"}}>
          <RSVP onCancelRSVP={cancelRSVP}/>  
        </div>
        : 
        <div>        
          <div style={{position: "absolute", top: 100, left: 115}}>
            <p style={{fontSize: 58, color: "#E29F00"}} className={font5.className}>ĐÁM CƯỚI</p>
            <p style={{fontSize: 58, color: "#E29F00"}} className={font5.className}>HÀ THÀNH</p>
          </div>

          <div style={{position: "absolute", bottom: 35, left: 115}}>
            <div>
              <span style={{fontSize: 24, color: "#F6EAD1", marginRight: 16}} className={font8.className}>[Boston]</span>
              <span style={{fontSize: 60, color: "#A21F17"}} className={font7.className}>Lời Tình</span>
            </div>
            <p style={{fontSize: 30, color: "#F6EAD1"}} className={font8.className}>của Ánh Bằng - Thanh Lan</p>
          </div>

          <div style={{position: "absolute", bottom: -300, left: 115}}>
            <p style={{fontSize: 40, color: "#F6EAD1"}} className={font4.className}>Thanh xuân của chúng ta</p>
            <p style={{fontSize: 30, marginTop: 8, color: "#E29F00"}} className={font2.className}>Bùi Anh Tuấn và Bảo Anh</p>
          </div>

          <div style={{position: "absolute", textAlign: "right", top: 120, right: 100}}>
            <p style={{fontSize: 65, color: "#532E18", textShadow: "-3px 2px 0px #E19E00"}} className={font3.className}>Khúc Ca</p>
            <p style={{fontSize: 65, color: "#532E18", textShadow: "-3px 2px 0px #E19E00"}} className={font3.className}>Tình Sâu</p>
            <p style={{fontSize: 24, color: "#F6EAD1"}} className={font6.className}>Hà Thanh</p>
          </div>

          <div style={{position: "absolute", textAlign: "right", bottom: 10, right: 100}}>
            <p style={{fontSize: 65, color: "#3D461C", textShadow: "-3px 2px 0px #E19E00"}} className={font1.className}>Đêm nhớ</p>
            <p style={{fontSize: 65, color: "#3D461C", textShadow: "-3px 2px 0px #E19E00"}} className={font1.className}>ngày mong</p>
            <p style={{fontSize: 35, color: "#FFE8D2"}} className={font1.className}>Thanh Tuyền</p>
          </div>
        </div>
      }
      
      
      </div>
    
    </div>


  )
}
