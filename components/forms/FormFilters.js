import Btn from "../btn/Btn";

export default function FormFilters({user, onChange, onSubmit}) {
    return (
        <form onSubmit={e => onSubmit(e, user.username)} className='d-flex flex-column justify-content-center mt-3'>
            <div className="mb-3">
                <label htmlFor="text" className='form-label'>User search</label>
                <input type="text"
                       id='text'
                       className='form-control'
                       value={user.username}
                       onChange={(e) => onChange('username', e.target.value)}/>
            </div>
            <Btn type='submit' name='search' classBtn='btn-success'/>
        </form>
    )
}