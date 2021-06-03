import {useEffect, useState} from 'react';
import {getUsers} from '../../api/users';

export default function Mentions({mention, onCLick}) {
  const [userExists, setUserExists] = useState(true);
  const userName = mention.replace('@', '');

  useEffect(async () => {
    try {
      await getUsers(userName);
    } catch (e) {
      setUserExists(false);
    }
  }, []);

  return userExists ?
      <span onClick={e => onCLick(e, `/users/${userName}`)}
            className="btn text-info p-0">{mention} </span>
      : mention + ' ';
}