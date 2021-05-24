export default function Btn ({ name, classBtn, onClick, type }) {
  return (
    <button type={type} className={`btn ${classBtn}`} onClick={onClick}>{name}</button>
  );
}