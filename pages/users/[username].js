import {withAuth} from "../../hof/withAuth";
import {withRedux} from "../../hof/withRedux";
import {addUserAsync} from "../../store/user";
import {addOnePostListAsync, changePostAsync, deletePostAsync, setPostsListAsync} from "../../store/posts";
import {useDispatch, useSelector} from "react-redux";

import PostsList from "../../components/list/PostsList";
import MainLayout from "../../components/layout/MainLayout";
import UserProfile from "../../components/user/UserProfile";
import CreatePostForm from "../../components/forms/CreatePostForm";

export default function Home() {
    const {user} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handlePostDelete = (deletedPost) => dispatch(deletePostAsync(deletedPost.id));

    const handlePostCreate = (newPost, formikHelpers) => {
        dispatch(addOnePostListAsync(newPost));
        formikHelpers.resetForm(true);
    }

    const handleEditPost =async (editPost,newPost,setEditing) => {
        await dispatch(changePostAsync(editPost.id, newPost))
        setEditing(false);
    };

    const profile = !user ? <CreatePostForm onSubmit={handlePostCreate}/> : null;

    return (
        <MainLayout>
            <UserProfile/>
            {profile}
            <PostsList showControls={user ? 0 : 1} onChange={handleEditPost} onDelete={handlePostDelete}/>
        </MainLayout>
    )
}

export const getServerSideProps = withRedux(withAuth(async (ctx, auth, {dispatch}) => {
        try {
            await dispatch(setPostsListAsync(ctx.query.username));

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
