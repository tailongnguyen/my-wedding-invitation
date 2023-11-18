"use client";

import { useState, useEffect, useRef } from 'react';
import styles from '../page.module.css';
import localFont from 'next/font/local'
import Dot from './Dot';

const dalatFont = localFont({ src: '../fonts/MTDalatSans.otf'})
const font7 = localFont({ src: '../fonts/SVN_HC_Elixir_Sans.otf'});
const images = [
    "firstpic.PNG",
    "memory.jpg",
    "startdate.jpg",
    "trips.jpg",
    "hobbies.jpg",
    "home.jpg",
    "chill.jpeg",
    "birthday.jpg",
    "tet.jpg",
    "propose.JPG",
    "haha.JPG"
]
const contents = [
    ["2017", "Thực tập sinh Long và 'mama tổng quản' Hạnh chụp hình với nhau sau khi Long giới thiệu thành công một thực tập sinh khác và được thưởng 2 lốp. Đây là tấm hình chung đầu tiên của 2 người, không ai nghĩ rằng một ngày nào đó nó lại xuất hiện ở đây."],
    ["2019", "Ảnh kỷ yếu ra trường của Long, vẫn là chị em."],
    ["11/2021", "Cô vít cách ly xã hội, nhà gần rủ nhau đi chơi cà phê cà pháo nghe nhạc dạo Hồ Tây, Hạnh bị muỗi đốt nên sốt xuất huyết. Long cảm thấy tội lỗi nên mời sang nhà nấu cho vài bữa cơm, đúng là đường đi ngắn nhất tới trái tim phụ nữ là phải đi qua dạ dày."],
    ["2022 - 2023", "Yêu nhau cái là dắt nhau đi khắp nơi, vào rừng lên núi ra biển. Hai đứa đi chèo SUP trên sông Bưởi ở Ninh Bình - Thanh Hóa, đi luôn cặp điện thoại."],
    ["2022 - 2023", "Cả hai đều thích hoạt động thể thao: cầu lông, trượt patin, trượt băng, tennis, bơi, chạy bộ, leo núi. Ngoài ra thi thoảng còn lôi nhau đi vẽ vời cho thêm yêu đời nữa."],
    ["2022 - 2023", "Cùng nhau trồng cây, nuôi mèo, trang trí nhà cửa, nấu nướng, tạo không gian ấm cúng sau một ngày làm việc mệt mỏi."],
    ["2022", "Lần đầu về Đan Phượng ra mắt nhà người yêu, không quên ra đồng chill. Gái phố cổ biến thành gái nông thôn trong phút chốc, vì cái sự thích thú và gần gũi thiên nhiên đã ăn vào máu."],
    ["11/2022", "Sinh nhật Long tròn 25, được Hạnh tổ chức hoành tráng."],
    ["2023", "Tết thứ 2 bên nhau, công sức chăm sóc của Hạnh bắt đầu cho thấy hiệu quả khi Long bắt đầu tăng được cân. Sau bức ảnh này, Hạnh quay sang bảo anh ơi, mình phải chụp ảnh cưới ở đây (và sau đó chụp thật)."],
    ["28/08/2023", "Sau gần 2 năm yêu nhau, Long quyết định cold hall Hạnh trong chuyến đi Ladakh. Ảnh chụp tại thung lũng cát Nubra thơ mộng, nhưng chỉ mang tính minh họa, vì sự thực là Long cầu hôn tại phòng nghỉ khách sạn, khi cả hai đều đang mặc quần lót ..."],
    ["28/08/2023", "Thế là nhân tiện chụp ảnh cưới ở Ladakh luôn. Siêu đẹp nha mọi người (xem thêm ảnh ở phía dưới)!!"]
]
export default function OurStory(props) {

    const [page, setPage] = useState(0);
    const smallPhotoRef = useRef(null);
    const bigPhotoRef = useRef(null);
    const boardRef = useRef(null);
    const [isDimScreen, setIsDimScreen] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            let newPage = page + 1;
            if (newPage >= 11) {
                newPage = 0;
            }
            console.log(newPage);
            setPage(newPage);
        }, 10000);
        
        return () => {
            clearInterval(interval);
        }
    });
    
    function onClickPhoto() {
        console.log("dimming screen ...")
        setIsDimScreen(true);
        // boardRef.current.style.zIndex = 6;
        // imageRef.current.style.maxWidth = "80vw";
        // imageRef.current.style.maxHeight = "100vh";
        bigPhotoRef.current.style.display = "block";
    }
    
    return (
        <div ref={boardRef} style={{height: "50vw", position: "relative", zIndex: 1, marginTop: "max(-5vh, -2vw)", backgroundColor: "#A21F17"}}>
            <div style={{backgroundColor: "#0000005f", height: "100vh", width: "100vw", position: "fixed", zIndex: 7, display: isDimScreen ? "block" : "none"}}>
                <img ref={bigPhotoRef} src={images[page]} style={{maxWidth: "80vw", maxHeight: "100vw", display: "none", zIndex: 8, border: "min(1vh, 0.8vw) solid #F6EAD1"}}></img>
            </div>
            <div style={{position: "absolute", width: "40vw", right: "10%", top: "8%"}}>
              <p className={styles.textStyle4 + " " + font7.className} style={{fontSize: "min(7vh, 5vw)"}}>CHUYỆN CHÚNG MÌNH</p>
              <p className={styles.textStyle3 + " " + font7.className} style={{fontSize: "min(6vh, 4.5vw)", marginTop: "min(2vh, 1vw)"}}>{contents[page][0]}</p>
              <p className={dalatFont.className} style={{fontSize: "min(4vh, 2.8vw)", color: "#F6EAD1", marginTop: "min(1vh, 1vw)"}}>{contents[page][1]}</p>
            </div>
            <div style={{position: "absolute", left: "10vw", top: "50%", transform: "translateY(-50%)"}}>
                <div style={{width: "min(7vh, 4vw)", height: "min(7vh, 4vw)", 
                            borderRadius: "100%", position: "absolute", top: "20%", left: "max(-4.5vh, -2vw)",
                            backgroundColor: "#E19E00"}} ></div>
                <div style={{width: "min(7vh, 4vw)", height: "min(7vh, 4vw)", 
                            borderRadius: "100%", position: "absolute", bottom: "20%", left: "max(-4.5vh, -2vw)",
                            backgroundColor: "#3D461C"}} ></div>
                <img onClick={onClickPhoto} ref={smallPhotoRef} src={images[page]} style={{maxWidth: "25vw", maxHeight: "35vw", border: "min(1vh, 0.8vw) solid #F6EAD1"}}></img>                
            </div>
            <div style={{display: "flex", flexDirection: "row", position: "absolute", bottom: "2vw", left: "50%", transform: "translateX(-50%)", justifyContent: "space-evenly", width: "40vw"}}>
                    <Dot onClick={() => {setPage(0)}} active={page == 0}/>
                    <Dot onClick={() => {setPage(1)}} active={page == 1}/>
                    <Dot onClick={() => {setPage(2)}} active={page == 2}/>
                    <Dot onClick={() => {setPage(3)}} active={page == 3}/>
                    <Dot onClick={() => {setPage(4)}} active={page == 4}/>
                    <Dot onClick={() => {setPage(5)}} active={page == 5}/>
                    <Dot onClick={() => {setPage(6)}} active={page == 6}/>
                    <Dot onClick={() => {setPage(7)}} active={page == 7}/>
                    <Dot onClick={() => {setPage(8)}} active={page == 8}/>
                    <Dot onClick={() => {setPage(9)}} active={page == 9}/>
                    <Dot onClick={() => {setPage(10)}} active={page == 10}/>
                </div>
          </div>
    )
}