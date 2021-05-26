import { useFormik } from "formik";
import Btn from "../btn/Btn";

export default function SearchForm ({ onSubmit }) {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validateOnChange: false,
    onSubmit: (values) => {
      onSubmit(values.name);
    },
  });

  return (
    <div className="w-100 d-flex justify-content-end">
      <form autoComplete="off" className="d-flex flex-column h-100 w-100" onSubmit={formik.handleSubmit}>
        <label htmlFor="name "
               className="form-label h3">User search &#8981;</label>
        <input type="text" id="name" className='form-control form-control-sm' value={formik.values.name}
               onChange={formik.handleChange} placeholder="Username?"/>
        <Btn name="Search" classBtn="btn btn-outline-info w-100 mt-3" type="submit"/>
      </form>
    </div>
  );
}