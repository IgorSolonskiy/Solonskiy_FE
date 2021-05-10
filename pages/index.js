import {useRouter} from "next/router";
import {useDispatch} from 'react-redux';
import {
    addPostsListThunkCreator,
    addOnePostListThunkCreator,
    deletePostThunkCreator
} from "../store/posts/asyncAtions/asyncActions";

import FormPosts from "../components/forms/FormPosts";
import PostsList from "../components/list/PostsList";
import MainLayout from "../components/layout/MainLayout";
import FormFilters from "../components/forms/FormFilters";
import {withAuth} from "../hof/withAuth";

export default function Home() {
    const dispatch = useDispatch()
    const router = useRouter();

    const handleDeleteClick = (deletedPost) => dispatch(deletePostThunkCreator(deletedPost.id));

    const handleCreateSumbit = (newPost, formikHelpers) => {
        dispatch(addOnePostListThunkCreator(newPost));
        formikHelpers.resetForm(true);
    }

    const handleFilterSubmit = async (username, formikHelpers) => {
        router.push(`/users/${username}`);
        formikHelpers.resetForm(true);
    }

    return (
        <MainLayout>
            <div className='d-flex align-items-start justify-content-between w-100'>
                <FormPosts onSubmit={handleCreateSumbit}/>
                <FormFilters onSubmit={handleFilterSubmit}/>
            </div>
            <PostsList onDelete={handleDeleteClick}/>
        </MainLayout>
    )
}

export const getServerSideProps = withAuth(async (ctx, auth, dispatch) => {
        await dispatch(addPostsListThunkCreator(auth.user.username));

        return {props: {}}
    }
)
