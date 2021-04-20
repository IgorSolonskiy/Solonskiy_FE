import Btn from "../btn/Btn";

export default function FormSignup({onChange, onSubmit, user}) {
    return (
        <form onSubmit={e=>onSubmit(e,user)} className='d-flex flex-column justify-content-center'>
            <div className="mb-3">
                <label htmlFor="text" className='form-label'>Name</label>
                <input type="text"
                       id='text'
                       className='form-control'
                       value={user.name}
                       onChange={event => onChange('name', event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email"
                       id='email'
                       className='form-control'
                       value={user.email}
                       onChange={event => onChange('email', event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password"
                       id='password'
                       className='form-control'
                       value={user.password}
                       onChange={event => onChange('password', event.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password_confirmation" className='form-label'>Confirm password</label>
                <input type="password"
                       id='password_confirmation'
                       className='form-control'
                       value={user.password_confirmation}
                       onChange={event => onChange('password_confirmation', event.target.value)}/>
            </div>
            <Btn name='Sign up' classBtn='btn-success'/>
        </form>
    )
}