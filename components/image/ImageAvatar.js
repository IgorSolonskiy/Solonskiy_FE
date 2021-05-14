import Image from "next/image";

export const ImageAvatar= ({user = null,profile ={avatar:''} ,width = 50,height = 50, className})=>{
    return(
        <Image src={user ? (user.avatar || '/defaultAvatar.png') : (profile.avatar || '/defaultAvatar.png')}
               width={width} height={height} className={className}/>
    )
}