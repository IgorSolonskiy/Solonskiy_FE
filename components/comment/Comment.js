import {Avatar} from "../image/Avatar";
import {useState} from "react";
import {getProfile} from "../../store/profile/actions";
import {useQuery} from "@redux-requests/react";
import {getPost} from "../../store/posts/actions";
import {Button, Popover} from "antd";
import {LikeOutlined} from "@ant-design/icons";
import {getUsersByCommentLiked, getUsersByCommentLikedAsync} from "../../store/user/actions";
import {useDispatch} from "react-redux";

import Link from "next/link";
import Btn from "../btn/Btn";
import EditCommentForm from "../forms/EditCommentForm";
import DynamicContent from "../parser/DynamicContent";
import PopoverUsersList from "../list/PopoverUsersList";
import classNames from "classnames";

export default function Comment({comment, onDelete, onSubmit, onLike, onUnlike}) {
    const {data: usersPaginateData} = useQuery(getUsersByCommentLiked());
    const {data: {profile}} = useQuery(getProfile());
    const {data: {post}} = useQuery(getPost());
    const [editing, setEditing] = useState(false);
    const dispatch = useDispatch();

    const handlePaginateUsers = pageNumber => dispatch(getUsersByCommentLikedAsync(comment.id, pageNumber));

    const handleEditComment = (comment, changeComment) => {
        onSubmit(comment, changeComment);
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
        <>
            {changeCommentButton}
            <Btn name="Delete"
                 type="button"
                 classBtn=" btn btn-outline-danger btn-sm ms-3"
                 onClick={() => onDelete(comment)}/>
        </>
        : null;

    const isLiked = classNames({
        'text-info': comment.liked,
    })

    return (
        <li className="d-flex align-items-center position-relative w-100 list-group-item list-group-item-action border m-2">
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
            <div className="d-flex position-absolute align-items-center justify-content-center" style={{right: '10px'}}>
                <Popover
                    content={<PopoverUsersList usersPaginateData={usersPaginateData}
                                               onPaginationChange={handlePaginateUsers}/>}
                    placement="bottom" trigger="click">
                    <Button onClick={() => handlePaginateUsers(1)}
                            style={{padding: '4px 10px', borderRadius: '50%'}}>{comment.likes_count || 0}</Button>
                </Popover>
                <LikeOutlined onClick={() => comment.liked ? onUnlike(comment) : onLike(comment)}
                              className={`mx-3 ${isLiked}`}
                              style={{fontSize: '18px', cursor: 'pointer'}}/>
                {controls}
            </div>
        </li>
    );
}
