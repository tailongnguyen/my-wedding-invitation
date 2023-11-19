"use client";

import { useEffect, useState, useRef } from 'react';
import styles from '../page.module.css';
import localFont from 'next/font/local';
import Link from "next/link";

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})

export default function NavBar(props) {
    const [isScrolled, setIsScrolled] = useState(false);
    const navBarRef = useRef(null);
    const storyRef = useRef(null);

    useEffect(() => {
      if (props.isComeBack != null) {
        storyRef.current.click();
        setIsScrolled(true);
      }
      else {
        window.addEventListener('scroll', () => {
          if (window.scrollY > 10 && navBarRef.current && navBarRef.current.style.display != "none") {            
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        })
      }
    }, []);

    return (
        <div 
            className={styles.navbar + " " + dalatFont.className}
            style={{"height": props.mode == 0 ? "100%" : "min(7vh, 10vw)", backgroundColor: isScrolled ? "#000000d9" : "#0000003b", "transition": "height 1s"}}
        >
          <div ref={navBarRef} style={{display: props.mode == 0 ? "none" : "flex", justifyContent: "space-between", margin: "0 auto", width: "100%", maxWidth: "90vh"}}>
            <div className={styles.navbarContent}>
              <Link ref={storyRef} href="#our-story"><p>Chuyện chúng mình</p></Link>
            </div>
            <div className={styles.navbarContent}>
              <Link href="#wedding-photo"><p>Ảnh cưới</p></Link>
            </div>
            <div className={styles.navbarContent}>
              <Link href="#music"><p>Bài hát</p></Link>
            </div>
            <div className={styles.navbarContent}>
              <Link href="#map"><p>Chỉ đường</p></Link>
            </div>
          </div>
        </div>
    )
}