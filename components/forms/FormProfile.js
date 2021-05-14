import {useFormik} from 'formik';
import * as Yup from 'yup';
import Btn from "../btn/Btn";
import {useDispatch, useSelector} from "react-redux";
import {setProfileId} from "../../store/profile";
import {Avatar} from "antd";

export default function FormProfile({onSubmit}) {
    const {profile} = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: profile.name,
            photo: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
        }),
        validateOnChange: false,
        onSubmit: (values, formikHelpers) => {
            let formData = new FormData();

            if (values.avatar) {
                formData.append("avatar", values.avatar);
            }

            formData.append("name", values.name);
            formData.append("_method", "PUT");
            onSubmit(formData)
        },
    });

    return (
        <form className="d-flex flex-column justify-content-center align-items-center mt-3 w-100"
              autoComplete="off"
              onSubmit={formik.handleSubmit}>
            <div className='d-flex w-100 align-items-center border justify-content-around'>
                <label htmlFor="name" className='form-label text-center m-0  w-25'>Full Name</label>
                <input type="text" id="name" className="form-control w-100"
                       value={formik.values.name}
                       onChange={formik.handleChange}
                       placeholder="Title?"/>
                {formik.errors.name ? <div className='text-danger'>{formik.errors.name}</div> : null}
            </div>
            <div className='d-flex w-100 align-items-center border justify-content-around mt-3 mb-3'>
                <label htmlFor="avatar"
                       className='btn btn-outline-success form-label text-center m-0  w-100'>Avatar</label>
                <input type="file" id="avatar" className="d-none"
                       onChange={(event) => {
                           formik.setFieldValue("avatar", event.currentTarget.files[0])
                           formik.setFieldValue("photo", URL.createObjectURL(event.currentTarget.files[0]));
                       }}
                />
            </div>
            {formik.values.photo && <Avatar src={formik.values.photo} size={150}/>}
            <div className='w-100 d-flex'>
                <Btn name='Save' classBtn='btn btn-outline-info w-50 mt-3' type='submit'/>
                <Btn name='Cancel' classBtn='btn btn-outline-danger w-50 mt-3 ms-3' type='button'
                     onClick={() => dispatch(setProfileId(null))}
                />
            </div>
        </form>
    )
}