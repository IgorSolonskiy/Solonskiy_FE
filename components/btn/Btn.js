export default function Btn({name, classBtn, onClick,type,style}) {
    return (
        <button type={type} className={`btn ${classBtn}`} style={style} onClick={onClick}>{name}</button>
    )
}