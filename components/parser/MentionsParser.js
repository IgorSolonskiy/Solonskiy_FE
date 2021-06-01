import {useEffect, useState} from "react";
import {getUsers} from "../../api/users";

import Tags from "../tags/Tags";

export default function MentionsParser({post}) {
  const [parseText, setParseText] = useState([]);

  const handleParseText = async text => await Promise.all(
      text.split(" ").map(async item => {
        const textItem = " " + item + " ";

        if (item[0] === "@" || item[0] === "#") {

          if (item[0] === "@") {
            try {
              await getUsers(item.replace("@", ""));
            } catch (e) {
              return textItem;
            }
          }

          return <Tags item={item} key={item}/>;
        }

        return textItem;
      }));

  useEffect(async () => {
    const parsePost = await handleParseText(post);
    await setParseText(parsePost);
  }, []);

  return parseText;
}