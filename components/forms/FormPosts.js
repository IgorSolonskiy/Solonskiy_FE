import {useState} from 'react';

export default function FormPosts({onSubmit}) {
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    const handleInputChange = (e) => e.target.name === "title" ? setTitle(e.target.value) : setContent(e.target.value);


    const handleCreateSubmit = e => {
        e.preventDefault();

        if (!content || !title) {
            return;
        }

        const newPost = {
            content,
            title,
        }

        onSubmit(newPost);
        setContent('');
        setTitle('');
    }

    return (
        <form className="form-posts" onSubmit={handleCreateSubmit}>
            <input type="text" name='title' className="form-posts__title" onChange={handleInputChange} value={title}
                   placeholder="Title?"/>
            <input type="text" name='content' className="form-posts__text" onChange={handleInputChange} value={content}
                   placeholder="What's happening?"/>
            <input type="submit" value="Tweet" className="form-posts__btn"/>
        </form>
    )
}