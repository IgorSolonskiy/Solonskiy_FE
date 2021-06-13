import {Avatar} from "../image/Avatar";
import {useState} from "react";
import {getProfile} from "../../store/profile/actions";
import {useQuery} from "@redux-requests/react";

import Link from "next/link";
import Btn from "../btn/Btn";
import EditCommentForm from "../forms/EditCommentForm";
import DynamicContent from "../parser/DynamicContent";
import {getPost} from "../../store/posts/actions";

export default function Comment({comment, onDelete, onSubmit}) {
  const {data: {profile}} = useQuery(getProfile());
  const {data: {post}} = useQuery(getPost());
  const [editing, setEditing] = useState(false);

  const handleEditComment = async (comment, changeComment) => {
    await onSubmit(comment, changeComment);
    setEditing(false);
  };
  const mentionedUsers = comment.mentionedUsers.map(user => user.username);
  const hashtags = comment.hashtags.map(tag => tag.name);

  const content = editing ?
      <EditCommentForm onSubmit={handleEditComment} comment={comment}/>
      :
      <p className="mt-3" style={{whiteSpace: "pre"}}>
        <DynamicContent mentions={mentionedUsers} hashtags={hashtags}
                        content={comment.content}/></p>;

  const changeCommentButton = profile.id === comment.author.id &&
      <Btn name="Change" type="button" onClick={() => setEditing(!editing)}
           classBtn="btn btn-outline-info btn-sm ms-3"/>;

  const controls = (profile.id === comment.author.id || post.author.id ===
      profile.id) ?
      <div className="w-100 d-flex justify-content-end align-items-center">
        {changeCommentButton}
        <Btn name="Delete"
             type="button"
             classBtn=" btn btn-outline-danger btn-sm ms-3"
             onClick={() => onDelete(comment)}/>
      </div>
      : null;

  return (
      <li className="border card border-secondary list-group-item  mt-3">
        <div className="w-100">
          <div className=" ms-2 me-auto">
            <div className="d-flex justify-content-center">
              <Avatar avatar={comment.author.avatar} name={comment.author.name}
                      size={40}/>
              <Link href={`/users/${comment.author.username}`}>
                <div
                    className=" btn fw-bold mt-2 mx-3 text-center text-uppercase card-header p-0">
                  {comment.author.username}
                </div>
              </Link>
            </div>
            {content}
          </div>
        </div>
        {controls}
      </li>
  );
}
