import {useState} from 'react';
import {useRouter} from "next/router";

import MainLayout from "../../components/layout/MainLayout";
import Posts from "../../components/posts/Posts";
import Form from "../../components/forms/Form";

import {changePost, deletePost, getPost} from "../../gateway/postsGateway";


export default function Post({posts}) {
    const [text, setText] = useState('');
    const [postsList, setPostList] = useState(posts);
    const router = useRouter();

    const handleChange = (e) => setText(e.target.value);

    const handleClick = async id => {
        await deletePost(id);
        router.push('/')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text) return null;

        const [postItem] = postsList;

        await changePost(postItem.id, text);
        setText('');
        setPostList(await getPost(postItem.id));
    }

    return (
        <MainLayout>
            <Form onChange={handleChange} onSubmit={handleSubmit} text={text}/>
            <Posts onClick={handleClick} posts={postsList}/>
        </MainLayout>)
}

Post.getInitialProps = async (ctx) => {
    const postData = await getPost(ctx.query.id);
    return {posts: postData}
};