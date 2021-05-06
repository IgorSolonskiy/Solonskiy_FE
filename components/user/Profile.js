import {useSelector} from "react-redux";

export default function Profile() {
    const {profile} = useSelector((state) => state.profile)

    return (
        <div className="d-flex">
            <h1>Hello, {profile.name}</h1>
        </div>
    )
}