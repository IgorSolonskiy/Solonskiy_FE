export default function Btn({name, classBtn, onClick,typeBtn='button'}) {
    return (
        <input type={typeBtn} className={`btn ${classBtn}`} value={name} onClick={onClick}/>
    )
}