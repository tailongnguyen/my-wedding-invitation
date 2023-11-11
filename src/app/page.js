"use client";

import Image from 'next/image'
import styles from './page.module.css'
import localFont from 'next/font/local'

import { useState } from 'react';
import RSVP from './components/RSVP';
import NavBar from './components/NavBar';

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
      {mode == 0 && 
        <div style={{opacity: rsvpOpacity, transition: "opacity 1s"}}>
          <RSVP onCancelRSVP={cancelRSVP}/>  
        </div>
      }
      
      
      </div>
    
    </div>


  )
}
