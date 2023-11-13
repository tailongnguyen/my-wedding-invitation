"use client";

import styles from '../page.module.css';
import localFont from 'next/font/local'

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})

export default function NavBar(props) {

    return (
        <div 
            className={styles.navbar + " " + dalatFont.className} 
            style={{"height": props.mode == 0 ? "100%" : "80px",  "transition": "height 1s"}}
        >
          <div style={{display: props.mode == 0 ? "none" : "flex", justifyContent: "space-between", margin: "0 auto", maxWidth: "50%"}}>
            <div className={styles.navbarContent}>
              <p>Chuyện chúng mình</p>
            </div>
            <div className={styles.navbarContent}>
              <p>Ảnh cưới</p>
            </div>
            <div className={styles.navbarContent}>
              <p>Bài hát</p>
            </div>
            <div className={styles.navbarContent}>
              <p>Chỉ đường</p>
            </div>
          </div>
        </div>
    )
}