import {useRouter} from "next/router";

export default function Tags({item}) {
  const router = useRouter();
  const href = item[0] === "#"
      ? `/posts/${item.replace("#", "")}`
      : `/users/${item.replace("@", "")}`;
  return (
      <span onClick={e => {
        e.stopPropagation();
        router.push(href);
      }
      } className="btn text-info p-0">{item}</span>
  );
}