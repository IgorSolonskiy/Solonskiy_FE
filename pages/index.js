import {useState} from 'react';
import {createPost, getPostsList} from "../gateway/postsGateway";
import MainLayout from "../components/MainLayout";


export default function Home({posts}) {
    const [postList, setPostList] = useState(posts);
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    }

    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!text) return null;

        await createPost(text);
        setText('');

        const newPostList = await getPostsList();

        setPostList(newPostList.data);

    }

    const handleToggleClass = (e) => {
        e.target.classList.toggle('hidden')
    }

    return (
        <MainLayout>
            <form className="form-posts" onSubmit={handleSumbit}>
                <input type="text" className="form-posts__text" onChange={handleChange} value={text}
                       placeholder="What's happening?"/>
                <input type="submit" value="Tweet" className="form-posts__btn"/>
            </form>
            <ul className="posts">
                {postList.map(({text,created_at,id}) => (
                    <li key={id} className="posts__item">
                        <div className="posts__user">
                            <span className="posts__name">User name</span>
                            <span className="posts__date">{new Date(created_at).getFullYear()}</span>
                            <div className="posts__edit hidden" onClick={handleToggleClass}>
                                <ul className="post-menu">
                                    <li className="post-menu__item"><i className="fas fa-trash-alt"/> <span
                                        className="post-menu__del">Delete</span></li>
                                    <li className="post-menu__item"><i className="fas fa-pencil-alt"/> <span
                                        className="post-menu__text">Edt</span></li>
                                </ul>
                            </div>
                        </div>
                        <p className="posts__text">{text}</p>
                    </li>
                ))}
            </ul>
        </MainLayout>
    )
}

Home.getInitialProps = async () => {
    const postsList = await getPostsList();

    return {posts: postsList.data}
}
