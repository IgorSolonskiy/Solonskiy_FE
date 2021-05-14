import {Avatar, Image} from 'antd';
import {UserOutlined} from '@ant-design/icons';

export const ImageAvatar = ({
                                user = null, profile = {avatar: ''},
                                size = 64, shape = '', preview = false
                            }) => {
    return (user ?
            user.avatar ?
                preview ? <Avatar size={size} src={<Image src={user.avatar}/>}/>
                    : <Avatar size={size} src={user.avatar}/>
                : <Avatar size={size} shape={shape} icon={<UserOutlined/>}/>

            :
            profile.avatar ?
                preview ? <Avatar size={size} src={<Image src={profile.avatar}/>}/>
                    : <Avatar size={size} src={profile.avatar}/>
                : <Avatar size={size} shape={shape} icon={<UserOutlined/>}/>
    )
}