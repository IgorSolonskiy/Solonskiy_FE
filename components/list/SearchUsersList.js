import {useSelector} from "react-redux";
import SearchUserInfo from "../user/SearchUserInfo";

export default function SearchUsersList() {
    const {searchUsers} = useSelector((state) => state.users)
    return (
        <ul className='list-group h-100 w-100 position-absolute overflow-hidden'
            style={{zIndex: 30,top: '70px'}}>
            {searchUsers.map(user => <SearchUserInfo user={user} key={user.id}/>)}
        </ul>
    )
}