import { useFormik } from "formik";
import * as Yup from "yup";
import Btn from "../btn/Btn";

export default function SearchForm ({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    validateOnChange: false,
    onSubmit: (values,formikHelpers) => {
      onSubmit(values.name, formikHelpers);
    },
  });

  return (
    <div className="w-100 d-flex justify-content-end">
      <form autoComplete="off" className="d-flex flex-column h-100 w-100" onSubmit={formik.handleSubmit}>
        <label htmlFor="name "
               className="form-label h3">User search &#8981;</label>
        <input type="text" id="name" value={formik.values.name}
               onChange={formik.handleChange} placeholder="Username?"/>
        {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
        <Btn name="Search" classBtn="btn btn-outline-info w-100 mt-3" type="submit"/>
      </form>
    </div>
  );
}