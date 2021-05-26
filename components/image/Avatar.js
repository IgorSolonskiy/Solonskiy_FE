import { Avatar as Image } from "antd";

export const Avatar = ({ size = 64, avatar = null, name = "User", shape }) => avatar
  ? <Image size={size} shape={shape} src={avatar}/>
  : <Image size={size} shape={shape}>{name}</Image>;