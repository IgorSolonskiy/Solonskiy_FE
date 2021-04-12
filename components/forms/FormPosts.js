import {useState} from 'react';
import Btn from "../btn/Btn";

export default function FormPosts({onSubmit, postData = {content: '', title: ''}}) {
    const [post, setPost] = useState(postData);

    const handleInputChange = (name, value) => setPost(prevPost=>{
        return{...prevPost,
            [name]: value,}
    })

    const handleCreateSubmit = (e, newPost) => {
        e.preventDefault();
        onSubmit(newPost, setPost);
    }

    return (
        <form className="d-flex flex-column justify-content-center" onSubmit={e => handleCreateSubmit(e, post )}>
            <label htmlFor="title" className='form-label'>Title</label>
            <input type="text" id="title" className="form-control"
                   onChange={e => handleInputChange('title', e.target.value)}
                   value={post.title}
                   placeholder="Title?"/>
            <label htmlFor="content" className='form-label'>Content</label>
            <input type="text" id="content" className="form-control"
                   onChange={e => handleInputChange('content', e.target.value)}
                   value={post.content}
                   placeholder="What's happening?"/>
            <Btn name='Tweet' classBtn='btn-success mt-3' typeBtn='submit'/>
        </form>
    )
}
