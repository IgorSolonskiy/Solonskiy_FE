import {useRouter} from "next/router";

export default function Mention({username}) {
  const router = useRouter();

  const handleClick = e => {
    e.stopPropagation();
    router.push(`/users/${username}`);
  };

  return <span onClick={handleClick}
               className="btn text-info p-0">@{username}</span>;
}