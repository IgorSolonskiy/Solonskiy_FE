import {useFormik} from 'formik';
import * as Yup from 'yup';
import Btn from "../btn/Btn";

export default function FormPosts({onSubmit, postData={title:'',content:''}}) {

    const formik = useFormik({
        initialValues: {
            title: postData.title,
            content: postData.content,
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
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
        <form className="d-flex flex-column justify-content-center" onSubmit={formik.handleSubmit}>
            <label htmlFor="title" className='form-label text-center'>Title</label>
            <input type="text" id="title" className="form-control"
                   value={formik.values.title}
                   onChange={formik.handleChange}
                   placeholder="Title?"/>
            {formik.errors.title ? <div className='text-danger'>{formik.errors.title}</div> : null}
            <label htmlFor="content" className='form-label text-center'>Content</label>
            <input type="text" id="content" className="form-control"
                   value={formik.values.content}
                   onChange={formik.handleChange}
                   placeholder="What's happening?"/>
            {formik.errors.content ? <div className='text-danger'>{formik.errors.content}</div> : null}
            <Btn name='Tweet' classBtn='btn-success mt-3' type='submit'/>
        </form>
    )
}

