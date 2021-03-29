import {useState} from 'react';
import PropTypes from 'prop-types';

export default function FormPosts({onSubmit,post}) {
    const [content, setContent] = useState(post.content );
    const [title, setTitle] = useState(post.title );

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

FormPosts.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    post: PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string
    }),
}

FormPosts.defaultProps = {
    post: {
        title: '',
        content: '',
    },
}