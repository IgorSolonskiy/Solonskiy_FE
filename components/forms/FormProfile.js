import {Avatar} from "../image/Avatar";
import {useFormik} from 'formik';
import {useSelector} from "react-redux";
import {CloseSquareTwoTone} from '@ant-design/icons';

import * as Yup from 'yup';
import Btn from "../btn/Btn";

export default function FormProfile({onSubmit}) {
    const {profile} = useSelector(state => state.profile);

    const formik = useFormik({
        initialValues: {
            name: profile.name,
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
        }),
        onSubmit: (values, formikHelpers) => {
            let formData = new FormData();

            if (values.avatar) {
                formData.append("avatar", values.avatar);
            }

            formData.append("name", values.name);
            formData.append("_method", "PUT");
            onSubmit(formData,formik)
        },
    });

    return (
        <form className="d-flex flex-column justify-content-center align-items-center mt-3 w-100"
              autoComplete="off"
              onSubmit={formik.handleSubmit}>
            <div className="col-md-4 w-100 mb-3">
                <div className="card">
                    <div className="card-body" style={{backgroundColor: '#B3E5FC'}}>
                        <div>{formik.values.file}</div>
                        <div className="d-flex flex-column align-items-center text-center"
                             style={{backgroundColor: '#B3E5FC'}}>
                            {formik.values.avatar
                                ? <div className='d-flex flex-column align-items-end position-relative p-3'>
                                    <label htmlFor="closeBtn"
                                           className='form-label text-center p-0 m-0 btn position-absolute end-0'>
                                        <CloseSquareTwoTone
                                            style={{fontSize: '26px'}}
                                            twoToneColor="red"/>
                                    </label>
                                    <input type="button"
                                           className='d-none'
                                           id='closeBtn'
                                           onClick={(event) => {
                                               formik.setFieldValue("avatar", '')
                                           }}/>
                                    <Avatar avatar={URL.createObjectURL(formik.values.avatar)} size={150}/>
                                </div>
                                : <label htmlFor="avatar"
                                         className='btn position-relative p-3 border-0'
                                         title='Change your avatar'>
                                    <Avatar avatar={profile.avatar} name={profile.name} size={150}/>
                                </label>}
                            <div className="mt-3">
                                <h4>{profile.username}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='d-flex w-100 align-items-center border justify-content-around'>
                <label htmlFor="name" className='form-label text-center m-0  w-25'>Full Name</label>
                <input type="text" id="name" className="form-control w-100"
                       value={formik.values.name}
                       onChange={formik.handleChange}
                       placeholder="Title?"/>
                {formik.errors.name ? <div className='text-danger'>{formik.errors.name}</div> : null}
            </div>
            <div className='d-flex w-100 align-items-center  justify-content-around'>
                <input type="file" id="avatar" className="d-none"
                       value={formik.initialValues.preview}
                       onChange={(event) => {
                           formik.setFieldValue("avatar", event.currentTarget.files[0])
                       }}
                />
            </div>
            <div className='w-100 d-flex justify-content-center'>
                <Btn name='Save' classBtn='btn btn-outline-info w-100 mt-3' type='submit'/>
            </div>
        </form>
    )
}