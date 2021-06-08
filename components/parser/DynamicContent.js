import Tag from "../tag/Tag";
import Mention from "../mention/Mention";

export default function DynamicContent({content, mentions}) {
  return content.split(/([@|#\w\.]+)/).map((part, id) => {
    if (part.startsWith("#")) {
      return <Tag tag={part.slice(1)} key={content + id}/>;
    }

    if (part.startsWith("@") && mentions.includes(part.slice(1))) {
      return <Mention username={part.slice(1)} key={content + id}/>;
    }

    return part;
  });
}