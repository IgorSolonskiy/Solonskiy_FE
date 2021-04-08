export default function List({children}) {
    return (
        <ul className="list-group list-group-flush w-75 mt-3">
            {children}
        </ul>
    )
}