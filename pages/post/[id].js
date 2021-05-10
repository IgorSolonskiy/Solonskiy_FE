import {useRouter} from "next/router";
import {withAuth} from "../../hof/withAuth";
import {addUserThunkCreator} from "../../store/user/asyncActions/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {
    addPostThunkCreator,
    changePostThunkCreator,
    deletePostThunkCreator
} from "../../store/posts/asyncAtions/asyncActions";
import {
    addCommentsListThunkCreator,
    addCommentThunkCreator,
    deleteCommentThunkCreator
} from "../../store/comments/asyncActions/asyncActions";

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import Posts from '../../components/post/Post';
import UserProfile from "../../components/user/UserProfile";
import CommentsList from "../../components/list/CommentsList";
import FormComments from "../../components/forms/FormComments";

export default function Post() {
    const {post} = useSelector(state => state.posts);
    const {profile} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const router = useRouter();

    const handleDeletePost = (deletedPost) => {
        dispatch(deletePostThunkCreator(deletedPost.id));
        router.push('/');
    }

    const handleDeleteComment = (deletedComment) => dispatch(deleteCommentThunkCreator(deletedComment.id));

    const handleEditSubmit = (newPost) => dispatch(changePostThunkCreator(post.id, newPost));

    const handleCreateComment = (newComment, formikHelpers) => {
        dispatch(addCommentThunkCreator(post.id, newComment))
        formikHelpers.resetForm(true);
    };

    return (
        <MainLayout>
            {
                post.author.id === profile.id ?
                        <FormPosts postData={post} onSubmit={handleEditSubmit}/>
                    :
                        <UserProfile/>
            }
            <FormComments onSubmit={handleCreateComment}/>
            <Posts post={post} onDelete={handleDeletePost}/>
            <CommentsList onDelete={handleDeleteComment}/>
        </MainLayout>
    )
}


export const getServerSideProps = withAuth(async (ctx,auth, dispatch, reduxStore) => {
        try {
            await dispatch(addPostThunkCreator(ctx.query.id));
            await dispatch(addCommentsListThunkCreator(ctx.query.id));

            const {posts: {post}} = reduxStore.getState();

            if(post.author.id !== auth.user.id) {
                await dispatch(addUserThunkCreator(post.author.username))
            }

            return {props: {}};
        } catch (e) {
            return {
                notFound: true,
            }
        }
    }
)
