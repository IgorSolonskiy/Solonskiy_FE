import Link from "next/link";

export default function LinkSuccess({src,name}) {
    return (
        <Link href={src}><span className='btn btn-outline-success mt-2'>{name}</span></Link>
    )
}