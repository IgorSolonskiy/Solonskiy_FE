import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import Tags from '../tags/Tags';
import Mentions from '../mentions/Mentions';

export default function MentionsParser({post}) {
  const router = useRouter();
  const [parseText, setParseText] = useState([]);

  const handleLinkMentions = (e, href) => {
    e.stopPropagation();
    return router.push(href);
  };

  const handleParseText = async text => await Promise.all(
      text.split(' ').map(async (content, id) => {
        const prefix = content.match(/#|@/);

        if (prefix) {
          return prefix[0] === '#' ?
              <Tags onCLick={handleLinkMentions} tag={content}
                    key={content + id}/>
              :
              <Mentions onCLick={handleLinkMentions} mention={content}
                        key={content + id}/>;
        }

        return content + ' ';
      }));

  useEffect(async () => {
    const parsePost = await handleParseText(post);
    await setParseText(parsePost);
  }, []);

  return parseText;
}