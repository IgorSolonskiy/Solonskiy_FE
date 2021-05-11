import {useSelector} from "react-redux";
import UserInfo from "../user/UserInfo";

export default function UsersList() {
    const {users,isVisible} = useSelector((state) => state.users)

    return (
        <ul className='list-group position-absolute min-vh-100' style={{zIndex: 30}}>
            {isVisible && users.map(user => <UserInfo user={user} key={user.id}/>)}
        </ul>
    )
}