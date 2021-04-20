import Btn from "../btn/Btn";

export default function FormLogin({user ,onChange, onSubmit}) {
    return (
        <form onSubmit={onSubmit} className='d-flex flex-column justify-content-center'>
            <div className="mb-3">
                <label htmlFor="text" className='form-label'>Login</label>
                <input type="text"
                       id='text'
                       className='form-control'
                       value={user.email}
                       onChange={(e)=>onChange('email',e.target.value)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password"
                       id='password'
                       className='form-control'
                       value={user.password}
                       onChange={(e)=>onChange('password',e.target.value)}/>
            </div>
            <Btn name='Log in' classBtn='btn-success'/>
        </form>
    )
}