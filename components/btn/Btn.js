export default function Btn({name, classBtn, onClick}) {
    return (
        <button className={`btn ${classBtn}`} onClick={onClick}>{name}</button>
    )
}