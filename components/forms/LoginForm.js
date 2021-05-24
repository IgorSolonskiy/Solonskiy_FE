import { useFormik } from "formik";
import * as Yup from "yup";
import Btn from "../btn/Btn";

export default function LoginForm ({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required"),
      password: Yup.string()
        .required("Required"),
    }),
    onSubmit: values => {
      onSubmit(values);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="d-flex flex-column justify-content-center">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Login</label>
        <input type="text"
               id="email"
               className="form-control"
               value={formik.values.email}
               onChange={formik.handleChange}/>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password"
               id="password"
               className="form-control"
               value={formik.values.password}
               onChange={formik.handleChange}/>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}
      </div>
      <Btn type="submit" name="Log in" classBtn="btn-success"/>
    </form>
  );
}