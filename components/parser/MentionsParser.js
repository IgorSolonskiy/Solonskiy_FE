import { useRouter } from "next/router";

import Tag from "../tag/Tag";
import Mention from "../mention/Mention";

export default function MentionsParser ({ post, mentions }) {
  const router = useRouter();

  const handleLinkMentions = (e, href) => {
    e.stopPropagation();
    return router.push(href);
  };

  return post.split(" ").map((content, id) => {
    const prefix = content.match(/#|@/);

    if (prefix) {
      return prefix[0] === "#" ?
        <Tag onCLick={handleLinkMentions} tag={content}
             key={content + id}/>
        :
        <Mention mentions={mentions} onCLick={handleLinkMentions} content={content}
                 key={content + id}/>;
    }

    return content + " ";
  });
}