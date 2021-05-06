import {useRouter} from "next/router";
import {useEffect} from "react";
import {withAuth} from "../hof/withAuth";
import {getUserPosts} from '../api/posts';
import {postsActions} from "../store/posts";
import {useDispatch, useSelector} from 'react-redux'
import {deletePost,createPost} from "../store/posts/asyncAtions/asyncActions";

import FormPosts from "../components/forms/FormPosts";
import List from "../components/list/List";
import Post from "../components/post/Post";
import MainLayout from "../components/layout/MainLayout";
import FormFilters from "../components/forms/FormFilters";

export default function Home({postsList, auth}) {
    const {posts} = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const router = useRouter();

    useEffect(() => {
        dispatch(postsActions.addPostsList(postsList));

        return () => dispatch(postsActions.clearPostsList());
    }, [postsList]);

    const handleDeleteClick = (deletedPost) => dispatch(deletePost(deletedPost.id));


    const handleCreateSumbit = (newPost, formikHelpers) => {
        dispatch(createPost(newPost));

        formikHelpers.resetForm(true);
    }

    const handleFilterSubmit = async (username) => {
        router.push(`/users/${username}`);
    }

    return (
        <MainLayout user={auth.user}>
            <div className="d-flex">
                <h1>Hello, {auth.user.name}</h1>
            </div>
            <FormPosts onSubmit={handleCreateSumbit}/>
            <FormFilters onSubmit={handleFilterSubmit}/>
            <List>
                {posts.map(post => <Post user={auth.user} key={post.id} post={post} onDelete={handleDeleteClick}/>)}
            </List>
        </MainLayout>
    )
}

export const getServerSideProps = withAuth(async (ctx, auth) => {
        const postsList = await getUserPosts(auth.user.username);

        return {props: {postsList}};
    }
)
