import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {addUserAsync} from "../../store/user";
import {
    addOnePostListAsync,
    changePostAsync,
    deletePostAsync,
    setPostsListClientAsync, setPostsListServerAsync
} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";

export default function Home({auth}) {
    const {user} = useSelector((state) => state.users);
    const {lastPagePaginate} = useSelector((state) => state.posts)
    const [fetching,setFetching] = useState(false);
    const [currentPage,setCurrentPage] = useState(2);
    const dispatch = useDispatch();

    useEffect(async()=>{
        if(fetching){
            await dispatch(setPostsListClientAsync(user ? user.username : auth.user.username,currentPage));
            setCurrentPage(prevState => prevState + 1);
            setFetching(false);
        }
    },[fetching])

    useEffect(async ()=>{
        setCurrentPage(()=>2)
        document.addEventListener('scroll',handleInfiniteScroll)
        return ()=>document.removeEventListener('scroll',handleInfiniteScroll)
    },[auth])

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handlePostCreate = (newPost, formikHelpers) => {
        dispatch(addOnePostListAsync(newPost));
        formikHelpers.resetForm(true);
    }

    const handleEditPost =async (editPost,newPost,setEditing) => {
        await dispatch(changePostAsync(editPost.id, newPost))
        setEditing(false);
    };

    const handleInfiniteScroll = (e) =>{
    const {scrollHeight, scrollTop} = e.target.documentElement;
    return scrollHeight === (scrollTop + window.innerHeight) && currentPage !== lastPagePaginate
        ? setFetching(true)
        : null ;
    }

    const profile = !user ? <CreatePostForm onSubmit={handlePostCreate}/> : null;

    return (
        <MainLayout>
            <UserProfile/>
            {profile}
            <PostsList showControls={user ? 0 : 1}
                       onChange={handleEditPost}
                       onDelete={handlePostDelete}/>
        </MainLayout>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, auth, {dispatch}) => {
        try {
            await dispatch(setPostsListServerAsync(ctx.query.username));

            if (ctx.query.username !== auth.user.username) {
                await dispatch(addUserAsync(ctx.query.username))
            }

            return {props: {}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
))
