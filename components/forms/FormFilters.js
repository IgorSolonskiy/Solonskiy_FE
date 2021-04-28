import {useFormik} from 'formik';
import * as Yup from 'yup';
import Btn from "../btn/Btn";

export default function FormFilters({ onSubmit}) {
    const formik = useFormik({
        initialValues: {
            username: '',
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            onSubmit(values.username);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className='d-flex flex-column justify-content-center mt-3'>
            <div className="mb-3">
                <label htmlFor="username" className='form-label'>User search</label>
                <input type="text"
                       id='username'
                       className='form-control'
                       value={formik.values.username}
                       onChange={formik.handleChange}/>
                {formik.touched.username && formik.errors.username ? (
                    <div className='text-danger'>{formik.errors.username}</div>
                ) : null}
            </div>
            <Btn type='submit' name='search' classBtn='btn-success'/>
        </form>
    )
}