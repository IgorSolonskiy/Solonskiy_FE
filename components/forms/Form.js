import {useState} from 'react';

export default function Form({onSubmit}) {
    const [text, setText] = useState('');

    const handleInputChange = (e) => setText(e.target.value);

    const handleCreateSubmit = e => {
        e.preventDefault();

        if (!text) {
            return;
        }

        onSubmit(text);
        setText('');
    }

    return (
        <form className="form-posts" onSubmit={handleCreateSubmit}>
            <input type="text" className="form-posts__text" onChange={handleInputChange} value={text}
                   placeholder="What's happening?"/>
            <input type="submit" value="Tweet" className="form-posts__btn"/>
        </form>
    )
}