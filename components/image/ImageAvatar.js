import {Avatar} from 'antd';
import {useSelector} from "react-redux";

export const ImageAvatar = ({size = 64,user,profile }) => {
    if (user) {
        if (user.avatar) {
            return <Avatar size={size} src={user.avatar}/>
        }
        return <Avatar size={size}>{user.name[0]}</Avatar>
    }


    if (profile.avatar) {
        return <Avatar size={size} src={profile.avatar}/>
    }

    return <Avatar size={size}>{profile.name[0]}</Avatar>
}
