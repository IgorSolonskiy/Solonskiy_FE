import {useFormik} from 'formik';
import * as Yup from 'yup';
import Btn from "../btn/Btn";

export default function FormComments({onSubmit}) {

    const formik = useFormik({
        initialValues: {
            content: '',
        },
        validationSchema: Yup.object({
            content: Yup.string()
                .max(150, 'Must be 150 characters or less')
                .required('Required'),
        }),
        validateOnChange:false,
        onSubmit: (values, formikHelpers) => {
            onSubmit(values,formikHelpers)
        },
    });

    return (
        <form className="d-flex flex-column justify-content-center align-items-center w-50 mb-3" onSubmit={formik.handleSubmit}>
            <label htmlFor="content" className='form-label text-center'>Comment</label>
            <input type="text" id="content" className="form-control"
                   value={formik.values.content}
                   onChange={formik.handleChange}
                   placeholder="Comment?"/>
            {formik.errors.content ? <div className='text-danger'>{formik.errors.content}</div> : null}
            <Btn name='Comment' classBtn='btn-success mt-3' type='submit'/>
        </form>
    )
}