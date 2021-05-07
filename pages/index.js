import {useRouter} from "next/router";
import {useEffect} from "react";
import {withAuth} from "../hof/withAuth";
import {getUserPosts} from '../api/posts';
import {postsActions} from "../store/posts";
import {useDispatch} from 'react-redux';
import {profileActions} from "../store/profile/actions";
import {addPostThunkCreator, deletePostThunkCreator} from "../store/posts/asyncAtions/asyncActions";

import FormPosts from "../components/forms/FormPosts";
import PostsList from "../components/list/PostsList";
import MainLayout from "../components/layout/MainLayout";
import FormFilters from "../components/forms/FormFilters";

export default function Home({postsList, auth}) {
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(postsActions.addPostsList(postsList));
        dispatch(profileActions.addProfile(auth.user));

    }, [postsList]);

    const handleDeleteClick = (deletedPost) => dispatch(deletePostThunkCreator(deletedPost.id));


    const handleCreateSumbit = (newPost, formikHelpers) => {
        dispatch(addPostThunkCreator(newPost));
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

export const getServerSideProps = withAuth(async (ctx, auth) => {
        const postsList = await getUserPosts(auth.user.username);

        return {props: {postsList}};
    }
)
