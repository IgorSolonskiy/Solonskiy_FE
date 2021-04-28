import Btn from "../btn/Btn";
import {useFormik} from "formik";
import * as Yup from "yup";

export default function FormSignup({onSubmit}) {
    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'The minimum number of characters is 3')
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
            username: Yup.string()
                .min(3, 'The minimum number of characters is 3')
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            password: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Required'),
            password_confirmation: Yup.string().when("password", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Both password need to be the same"
                )
            }).required('Required'),
        }),
        onSubmit: values => {
            onSubmit(values);
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className='d-flex flex-column justify-content-center'>
            <div className="mb-3">
                <label htmlFor="name" className='form-label'>Name</label>
                <input type="text"
                       id='name'
                       className='form-control'
                       value={formik.values.name}
                       onChange={formik.handleChange}/>
                {formik.touched.name && formik.errors.name ? (
                    <div className='text-danger'>{formik.errors.name}</div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="username" className='form-label'>Username</label>
                <input type="text"
                       id='username'
                       className='form-control'
                       value={formik.values.username}
                       onChange={formik.handleChange}/>
                {formik.touched.username && formik.errors.username ? (
                    <div className='text-danger'>{formik.errors.username}</div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className='form-label'>Email</label>
                <input type="email"
                       id='email'
                       className='form-control'
                       value={formik.values.email}
                       onChange={formik.handleChange}/>
                {formik.touched.email && formik.errors.email ? (
                    <div className='text-danger'>{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className='form-label'>Password</label>
                <input type="password"
                       id='password'
                       className='form-control'
                       value={formik.values.password}
                       onChange={formik.handleChange}/>
                {formik.touched.password && formik.errors.password ? (
                    <div className='text-danger'>{formik.errors.password}</div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="password_confirmation" className='form-label'>Confirm password</label>
                <input type="password"
                       id='password_confirmation'
                       className='form-control'
                       value={formik.values.password_confirmation}
                       onChange={formik.handleChange}/>
                {formik.touched.password_confirmation && formik.errors.password_confirmation ? (
                    <div className='text-danger'>{formik.errors.password_confirmation}</div>
                ) : null}
            </div>
            <Btn type='submit' name='Sign up' classBtn='btn-success'/>
        </form>
    )
}