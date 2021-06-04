export default function Tag({tag, onCLick}) {
  return (
      <span
          onClick={event => onCLick(event, `/posts/${tag.replace('#', '')}`)}
          className="btn text-info p-0">{tag} </span>
  );
}