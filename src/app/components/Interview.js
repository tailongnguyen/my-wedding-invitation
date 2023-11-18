import styles from '../page.module.css';
import localFont from 'next/font/local'

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})
const dalatCapFont = localFont({ src: '../fonts/MTDalatSansCapRegular-Ver1.1.otf'})
const font7 = localFont({ src: '../fonts/SVN_HC_Elixir_Sans.otf'});

export default function Interview(props) {

    return (
        <div style={{margin: "5vw auto", zIndex: 5, width: "min(100vh, 80vw)", position: "relative", textAlign: props.mode == 0 ? "left" : "right"}}>              
            <div className={props.mode == 0 ? styles.interviewLeft : styles.interviewRight}>
                <div className={font7.className + " " + (props.mode == 0 ? styles.interviewTitleLeft : styles.interviewTitleRight)}>
                    <span className={styles.textStyle3} style={{fontSize: "min(4vh, 3.5vw)", marginRight: "1vw"}}>{props.content1}</span>
                    <span className={styles.textStyle1} style={{fontSize: "min(5vh, 4.5vw)"}}>{props.content2}</span>
                </div>
                
                <div className={props.mode == 0 ? styles.interviewTextLeft : styles.interviewTextRight}>
                    <p  className={dalatCapFont.className} style={{fontSize: "min(3vh, 2.5vw)", paddingRight: props.mode == 0 ? "3vw" : "0", paddingLeft: props.mode == 1 ? "3vw" : "0", marginBottom: "2vw"}}>{props.content3}</p>                  
                    <p  className={dalatFont.className} style={{fontSize: "min(3vh, 2.8vw)", paddingRight: props.mode == 0 ? "3vw" : "0", paddingLeft: props.mode == 1 ? "3vw" : "0"}}>{props.content4}</p>
                </div>
            </div>
            <img style={{position: "relative", width: "40%"}} src={props.image} />
        </div>
    )
}