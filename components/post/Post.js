import {Avatar} from "../image/Avatar";
import {useRouter} from "next/router";
import {useState} from "react";
import {getProfile} from "../../store/profile/actions";
import {useQuery} from "@redux-requests/react";
import {LikeOutlined} from '@ant-design/icons';
import {Popover, Button} from 'antd';
import {getUsersByPostLiked, getUsersByPostLikedAsync} from "../../store/user/actions";
import {useDispatch} from "react-redux";

import Btn from "../btn/Btn";
import EditPostForm from "../forms/EditPostForm";
import DynamicContent from "../parser/DynamicContent";
import classNames from "classnames";
import PopoverUsersList from "../list/PopoverUsersList";

export default function Post({post, onDelete, onChange, onLike, onUnlike}) {
    const {data: usersPaginateData} = useQuery(getUsersByPostLiked());
    const {data: {profile}} = useQuery(getProfile());
    const [editing, setEditing] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const showControls = profile.id === post.author.id;

    const handleEditPost = (editPost, newPost) => {
        onChange(editPost, newPost);
        setEditing(false);
    };

    const mentionedUsers = post.mentionedUsers.map(user => user.username);
    const hashtags = post.hashtags.map(tag => tag.name);

    const handlePaginateUsers = pageNumber => dispatch(getUsersByPostLikedAsync(post.id, pageNumber));

    const content = editing ?
        <EditPostForm onSubmit={handleEditPost} post={post}/>
        :
        <p className="mt-3" style={{whiteSpace: "pre"}}>
            <DynamicContent mentions={mentionedUsers} hashtags={hashtags}
                            content={post.content}/>
        </p>;

    const controls = showControls
        ? <>
            <Btn name="Change"
                 type="button"
                 onClick={() => setEditing(!editing)}
                 classBtn=" btn btn-outline-info btn-sm"/>
            <Btn name="&times;"
                 type="button"
                 classBtn="badge bg-primary rounded-pill ms-3"
                 onClick={() => onDelete(post)}/>
        </>
        : null;

    const isLiked = classNames({
        'text-info': post.liked,
    })

    return (
        <li className="d-flex align-items-center position-relative w-100 list-group-item list-group-item-action">
            <div className="d-flex flex-column w-100">
                <div onClick={() => !editing && router.push(`/post/${post.id}`)}>
                    <div className="w-100">
                        <div className=" ms-2 me-auto w-100">
                            <div onClick={(event) => {
                                event.stopPropagation();
                                router.push(`/users/${post.author.username}`)
                            }}
                                 style={{fontSize: '14px', margin: '0 auto'}}
                                 className="d-flex w-25 justify-content-center align-items-center btn p-0">
                                <Avatar avatar={post.author.avatar} name={post.author.name}
                                        size={40}/>
                                <div style={{width: "200px"}}
                                     className="fw-bold mt-2 mx-3 text-center text-uppercase ">
                                    {post.author.username}
                                </div>
                            </div>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex position-absolute end-0 align-items-center justify-content-center">
                <Popover content={<PopoverUsersList usersPaginateData={usersPaginateData}
                                                    onPaginationChange={handlePaginateUsers}/>}
                         placement="bottom" trigger="click">
                    <Button onClick={() => handlePaginateUsers(1)}
                            style={{padding: '4px 10px', borderRadius: '50%'}}>{post.likes_count || 0}</Button>
                </Popover>
                <LikeOutlined onClick={() => post.liked ? onUnlike(post) : onLike(post)} className={`mx-3 ${isLiked}`}
                              style={{fontSize: '18px', cursor: 'pointer'}}/>
                {controls}
            </div>
        </li>
    );
}
