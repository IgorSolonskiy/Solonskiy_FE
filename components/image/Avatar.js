import {Avatar as Image} from 'antd';

export const Avatar = ({size = 64, avatar = null, name = 'User'}) => avatar
    ? <Image size={size} src={avatar}/>
    : <Image size={size}>{name}</Image>;