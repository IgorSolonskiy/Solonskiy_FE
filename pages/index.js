import {useState} from 'react';
import {createPost, deletePost, getPostsList} from "../gateway/postsGateway";

import MainLayout from "../components/layout/MainLayout";
import Form from "../components/forms/Form";
import Posts from "../components/posts/Posts";

export default function Home({posts}) {
    const [postList, setPostList] = useState(posts);
    const [text, setText] = useState('');


    const handleChange = (e) => setText(e.target.value);

    const handleClick = async (id) =>{
        const newPostsList = await deletePost(id);

        setPostList(newPostsList);
    }


    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!text) return null;

        setPostList(await createPost(text));
        setText('');
    }

    const reversePostsList = postList.slice().reverse();

    return (
        <MainLayout>
            <Form onChange={handleChange} onSubmit={handleSumbit} text={text}/>
            <Posts onClick={handleClick} posts={reversePostsList} />
        </MainLayout>
    )
}

Home.getInitialProps = async () => {
    return {posts: await getPostsList()}
};

