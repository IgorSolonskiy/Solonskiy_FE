import {useState} from 'react';

export default function FormPosts({onSubmit, post = {content: '', title: ''}}) {
    const [posts, setPosts] = useState(post);

    const handleChange = (e) => {
        setPosts(prev => {
            return {
                ...prev,
                [e.target.id]: e.target.value,
            }
        })
    }

    const handleCreateSubmit =async e => {
        e.preventDefault();

        if(!posts.content || !posts.title){
            return ;
        }

        await onSubmit(posts);
        setPosts({content: '', title: ''});
    }

    return (
        <form className="form-posts" onSubmit={handleCreateSubmit}>
            <label htmlFor="title" className='form-posts__label'>Title</label>
            <input type="text" id='title' className="form-posts__title" onChange={handleChange} value={posts.title}
                   placeholder="Title?"/>
            <label htmlFor="content" className='form-posts__label'>Content</label>
            <input type="text" id='content' className="form-posts__text" onChange={handleChange} value={posts.content}
                   placeholder="What's happening?"/>
            <input type="submit" value="Tweet" className="form-posts__btn"/>
        </form>
    )
}
