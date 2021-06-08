import {useRouter} from "next/router";

export default function Tag({tag}) {
  const router = useRouter();

  const handleClick = e => {
    e.stopPropagation();
    router.push(`/posts/${tag}`);
  };

  return <span onClick={handleClick}
               className="btn text-info p-0">#{tag}</span>;
}