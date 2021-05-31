import {useEffect, useState} from "react";
import apiClient from "../../libs/apiClient";
import Link from "next/link";
import {useRouter} from "next/router";

export default function MentionsParser({post}) {
    const [tagList, setTagList] = useState([]);
    const router = useRouter()

    useEffect(async () => {
        const textList = await Promise.all(post.split(' ')
            .map(async item => {
                if (item[0] === '#') {
                    return <span key={item} className='text-info'>{item}</span>
                }
                if (item[0] === '@') {
                    try {
                        const {data: user} = await apiClient(`users/${item.replace('@', '')}`)
                        if (user) {
                            return <span key={item}
                                         onClick={e => {
                                             e.stopPropagation()
                                             router.push(`/users/${user.username}`)
                                         }
                                         }
                                         className='btn text-info'>{item}</span>
                        }
                    } catch (e) {
                        return ' ' + item + ' ';
                    }
                }
                return ' ' + item + ' ';
            }))

        await setTagList(textList)
    }, [])

    return tagList
}