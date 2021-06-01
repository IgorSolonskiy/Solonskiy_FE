import {useEffect, useState} from 'react';
import {getUsers} from '../../api/users';

import Tags from '../tags/Tags';

export default function MentionsParser({post}) {
  const [parseText, setParseText] = useState([]);

  const handleParseText = async text => await Promise.all(
      text.split(' ').map(async (content, id) => {
        const textItem = ' ' + content + ' ';

        if (content[0] === '@' || content[0] === '#') {

          if (content[0] === '@') {
            try {
              await getUsers(content.replace('@', ''));
            } catch (e) {
              return textItem;
            }
          }
          return <Tags item={content} key={content + id}/>;
        }

        return textItem;
      }));

  useEffect(async () => {
    const parsePost = await handleParseText(post);
    await setParseText(parsePost);
  }, []);

  return parseText;
}