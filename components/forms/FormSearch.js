export default function FormSearch({onChange}) {
    return (
        <form autoComplete="off" className='d-flex flex-column'>
            <label htmlFor="username"
                   className='form-label'
                   autoComplete="new-password"
                   className='h3'>User search &#8981;</label>
            <input type="text" id='username' onChange={onChange} placeholder='Username?'/>
        </form>
    )
}