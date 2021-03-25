import {useState} from 'react';
import {changePost, createPost, deletePost, getPostsList} from "../gateway/postsGateway";
import MainLayout from "../components/MainLayout";


export default function Home({posts}) {
    const [postList, setPostList] = useState(posts);
    const [textCreate, setTextCreate] = useState('');
    const [textEdit, setTextEdit] = useState('');
    const [visibilityForm, setVisibilityForm] = useState(false);
    const [postId, setPostID] = useState(null);

    const handleChange = (e) => {
        const formCreate = document.querySelector('.form-posts').contains(e.target);

        formCreate ? setTextCreate(e.target.value) : setTextEdit(e.target.value);
    }


    const handleSumbit = async (e) => {
        e.preventDefault();

        if (!textCreate) return null;

        setPostList(await createPost(textCreate));
        setTextCreate('');
    }

    const handleDeletePost = async (id) => setPostList(await deletePost(id));


    const handleChangePost = async (e, id) => {
        e.preventDefault();

        setPostList(await changePost(id, `${textEdit}`));
        handleToggleVisability(id);
    };


    const handleToggleVisability = (id, text) => {
        setTextEdit(text);
        setPostID(id);
        setVisibilityForm(!visibilityForm);
    }

    const reversePostsList = postList.slice().reverse();


    return (
        <MainLayout>
            <form className="form-posts" onSubmit={handleSumbit}>
                <input type="text" className="form-posts__text" onChange={handleChange} value={textCreate}
                       placeholder="What's happening?"/>
                <input type="submit" value="Tweet" className="form-posts__btn"/>
            </form>
            <ul className="posts">
                {reversePostsList.map(({text, created_at, id}) => (
                    <li key={id} className="posts__item">
                        <div className="posts__user">
                            <span className="posts__name">User name</span>
                            <span className="posts__date">{new Date(created_at).getFullYear()}</span>
                            <div className="posts__edit">
                                <ul className="post-menu">
                                    <li className="post-menu__item" onClick={() => handleDeletePost(id)}><i
                                        className="fas fa-trash-alt"/> <span
                                        className="post-menu__del">Delete</span></li>
                                    <li className="post-menu__item " onClick={() => handleToggleVisability(id, text)}>
                                        <i className="fas fa-pencil-alt"/> <span
                                        className="post-menu__text">Edit</span></li>
                                </ul>
                            </div>
                        </div>
                        <p className="posts__text">{text}</p>
                    </li>
                ))}
            </ul>
            {visibilityForm &&
            <form className="form-edit" onSubmit={(e) => handleChangePost(e, postId)}>
                <input type="text" defaultValue={textEdit} className="form-edit__text" onChange={handleChange}/>
                <input type="submit" value="Change" className="form-edit__btn"/>
            </form>}
        </MainLayout>
    )
}

Home.getInitialProps = async () => {
    return {posts: await getPostsList()}
};

