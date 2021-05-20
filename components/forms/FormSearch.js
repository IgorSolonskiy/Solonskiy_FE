export default function FormSearch({onChange}) {
    return (
        <div className='w-100 d-flex justify-content-end'>
            <form autoComplete="off" className='d-flex flex-column h-100 w-100'>
                <label htmlFor="username"
                       className='form-label'
                       autoComplete="new-password"
                       className='h3'>User search &#8981;</label>
                <input type="text" id='username' onChange={onChange} placeholder='Username?'/>
            </form>
        </div>
    )
}