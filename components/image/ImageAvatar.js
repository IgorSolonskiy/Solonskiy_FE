import { Avatar } from 'antd';

export const ImageAvatar= ({user = null,profile ={avatar:''} ,size = 64, shape=''})=>{
    return(
        <Avatar size={size}
                shape={shape}
                src={user ? (user.avatar || '/defaultAvatar.png') : (profile.avatar || '/defaultAvatar.png')}
               />
    )
}