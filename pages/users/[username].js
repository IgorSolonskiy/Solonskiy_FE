import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {addUserAsync} from "../../store/user";
import {
    addOnePostListAsync,
    changePostAsync,
    deletePostAsync, setFetching,
    setPostsListClientAsync,
    setPostsListServerAsync
} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";

export default function Home({auth}) {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.users);
    const {lastPagePaginate, fetching} = useSelector((state) => state.posts)
    const [currentPage, setCurrentPage] = useState(Number(process.env.DEFAULT_PAGINATE_POSTS_PAGE_CLIENT));

    useEffect( () => {
        if(currentPage > lastPagePaginate) {
            return null;
        };

        if (fetching) {
            setCurrentPage(prevPage=>prevPage + Number(process.env.ONE_PAGE))
            dispatch(setPostsListClientAsync(user ? user.username : auth.user.username, currentPage));
            dispatch(setFetching(false));
        }
    }, [fetching])

    useEffect(  () => {
        document.addEventListener('scroll', handleInfiniteScroll);
        setCurrentPage(()=>Number(process.env.DEFAULT_PAGINATE_POSTS_PAGE_CLIENT));

        return  () => document.removeEventListener('scroll', handleInfiniteScroll);;
    }, [auth])

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handlePostCreate = (newPost, formikHelpers) => {
        dispatch(addOnePostListAsync(newPost));
        formikHelpers.resetForm(true);
    }

    const handleEditPost = async (editPost, newPost, setEditing) => {
        await dispatch(changePostAsync(editPost.id, newPost))
        setEditing(false);
    };

    const handleInfiniteScroll = (e) => {
        const {scrollHeight, scrollTop} = e.target.documentElement;

        if(scrollHeight === (scrollTop + window.innerHeight)){
            dispatch(setFetching(true));
        }
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
