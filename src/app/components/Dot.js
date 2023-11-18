export default function Dot(props) {

    return (
        <div onClick={props.onClick} style={{height: "min(2vw, 20px)", cursor: "pointer", width: "min(2vw, 20px)", borderRadius: "100%", backgroundColor: "#E19E00", opacity: props.active ? 1 : 0.3}}></div>
    )
}