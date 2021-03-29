import {useRouter} from "next/router";
import PropTypes from "prop-types";

import {changePost, deletePost, getPosts} from '../../gateway/postsGateway';

import MainLayout from "../../components/layout/MainLayout";
import FormPosts from "../../components/forms/FormPosts";
import List from "../../components/list/List";
import Posts from '../../components/post/Post';

export default function Post({posts}) {
    const router = useRouter();

    const handleDeleteClick =async (id) => {
        await  deletePost(`posts/${id}`);
        router.push('/');
    }

    const handleEditSubmit = async (newPost) => {
        await  changePost(`posts/${posts.id}`,newPost );

        router.push('/');
    }

    return (
        <MainLayout>
            <FormPosts post={posts} onSubmit={handleEditSubmit}/>
            <List>{[posts].map(post=><Posts key={post.id} {...post}  onDelete={handleDeleteClick} />) }</List>
        </MainLayout>)
}

Post.getInitialProps = async (ctx) => {
    const posts = await getPosts(`posts/${ctx.query.id}`);
    return {posts};
};

Post.propTypes = {
    posts: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }).isRequired,
}