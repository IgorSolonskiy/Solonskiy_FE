import {useFormik} from 'formik';
import * as Yup from 'yup';
import Btn from "../btn/Btn";

export default function EditCommentForm({onSubmit, comment = {content: ''},setEditing}) {

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
            onSubmit(comment,values,setEditing)
        },
    });

    return (
        <form className="d-flex  justify-content-start align-items-center w-100 mt-3 mb-0   "
              autoComplete="off"
              onSubmit={formik.handleSubmit}>
            <div className='w-75'>
                <input type="text" id="content" className="form-control p-1"
                       value={formik.values.content}
                       onChange={formik.handleChange}/>
                {formik.errors.content ? <div className='text-danger'>{formik.errors.content}</div> : null}
            </div>
            <Btn name='Save'
                 type='submit'
                 classBtn=' btn btn-outline-info btn-sm ms-3'/>
        </form>
    )
}