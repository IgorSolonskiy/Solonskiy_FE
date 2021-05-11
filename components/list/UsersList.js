import {useSelector} from "react-redux";
import UserInfo from "../user/UserInfo";

export default function UsersList() {
    const {users:{users, isVisible}, profile: {profile}} = useSelector((state) => state)

    return (
        <ul className='list-group position-absolute min-vh-100' style={{zIndex: 30}}>
            {isVisible && users
                .filter(({username})=>username !== profile.username)
                .map(user => <UserInfo user={user} key={user.id}/>)}
        </ul>
    )
}