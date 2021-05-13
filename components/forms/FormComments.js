import {useFormik} from 'formik';
import * as Yup from 'yup';
import Btn from "../btn/Btn";

export default function FormComments({onSubmit, comment = {content: ''}}) {

    const formik = useFormik({
        initialValues: {
            content: comment.content,
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
        <form className="d-flex justify-content-center align-items-center w-50 ms-3"
              autoComplete="off"
              onSubmit={formik.handleSubmit}>
            <input type="text" id="content" className="form-control p-1"
                   value={formik.values.content}
                   onChange={formik.handleChange}
                   placeholder="Comment?"/>
            {formik.errors.content ? <div className='text-danger'>{formik.errors.content}</div> : null}
            <Btn name='Comment' classBtn='btn-success ms-3 btn-sm' type='submit'/>
        </form>
    )
}