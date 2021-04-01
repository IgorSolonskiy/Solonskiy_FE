import {useState} from 'react';

export default function FormPosts({onSubmit, postData = {content: '', title: ''}}) {
    const [post, setPost] = useState(postData);

    const handleInputChange = (name, value) => setPost({
        ...post,
        [name]: value,
    })

    const handleCreateSubmit = (e, newPost) => {
        e.preventDefault();
        setPost({content: '', title: ''});
        onSubmit(newPost);
    }

    return (
        <form className="form-posts" onSubmit={e => handleCreateSubmit(e, post)}>
            <label htmlFor="title" className='form-posts__label'>Title</label>
            <input type="text" className="form-posts__title"
                   onChange={e => handleInputChange('title', e.target.value)}
                   value={post.title}
                   placeholder="Title?"/>
            <label htmlFor="content" className='form-posts__label'>Content</label>
            <input type="text" className="form-posts__text"
                   onChange={e => handleInputChange('content', e.target.value)}
                   value={post.content}
                   placeholder="What's happening?"/>
            <input type="submit" value="Tweet" className="form-posts__btn"/>
        </form>
    )
}
