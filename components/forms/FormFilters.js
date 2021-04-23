import Btn from "../btn/Btn";

export default function FormFilters({onSubmit,onChange,filtersUser}) {
    return (
        <form className='d-flex mt-3' onSubmit={onSubmit}>
            <input type='text'
                   className='form-control'
                   placeholder='Author'
                   value={filtersUser}
                   onChange={(e)=>onChange(e.target.value)}/>
            <Btn name='Search' classBtn='btn-outline-success ms-3' typeBtn='submit'/>
        </form>
    )
}