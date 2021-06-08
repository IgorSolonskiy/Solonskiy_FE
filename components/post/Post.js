import { Avatar } from "../image/Avatar";
import { useRouter } from "next/router";
import { useState } from "react";

import Btn from "../btn/Btn";
import EditPostForm from "../forms/EditPostForm";
import { useSelector } from "react-redux";
import MentionsParser from "../parser/MentionsParser";

export default function Post ({ post, onDelete, onChange }) {
  const profile = useSelector((state) => state.profile.profile);
  const [editing, setEditing] = useState(false);
  const router = useRouter();
  const showControls = profile.id === post.author.id;

  const handleEditPost = async (editPost, newPost) => {
    await onChange(editPost, newPost);
    setEditing(false);
  };

  const content = editing ?
    <EditPostForm onSubmit={handleEditPost} post={post}/>
    :
    <p className="mt-3" style={{ whiteSpace: "pre" }}>
      <MentionsParser mentions={post.mentionedUsers} text={post.content}/></p>;

  const controls = showControls
    ? <div
      className="d-flex position-absolute end-0 align-items-center justify-content-around">
      <Btn name="Change"
           type="button"
           onClick={() => setEditing(!editing)}
           classBtn=" btn btn-outline-info btn-sm"/>
      <Btn name="&times;"
           type="button"
           classBtn="badge bg-primary rounded-pill ms-3"
           onClick={() => onDelete(post)}/>
    </div>
    : null;

  return (
    <li className="d-flex align-items-center position-relative w-100 list-group-item list-group-item-action">
      <div className="d-flex flex-column w-100">
        <div onClick={() => !editing && router.push(`/post/${post.id}`)}>
          <div className="w-100">
            <div className=" ms-2 me-auto w-100">
              <div className="d-flex justify-content-center align-items-center ">
                <Avatar avatar={post.author.avatar} name={post.author.name} size={40}/>
                <div style={{ width: "200px" }}
                     className="fw-bold mt-2 mx-3 text-center text-uppercase ">{post.author.username}
                </div>
              </div>
              {content}
            </div>
          </div>
        </div>
      </div>
      {controls}
    </li>
  );
}
