export default function Mention ({ mentions, content, onCLick }) {
  const userName = content.replace("@", "");
  const user = mentions.filter(user => user.name === userName);

  return user.length ?
    <span onClick={e => onCLick(e, `/users/${userName}`)}
          className="btn text-info p-0">{content} </span>
    : content + " ";
}