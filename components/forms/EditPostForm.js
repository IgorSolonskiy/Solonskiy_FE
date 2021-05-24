import { useFormik } from "formik";
import * as Yup from "yup";
import Btn from "../btn/Btn";

export default function EditPostForm ({ onSubmit, post = { content: "", title: "" } }) {
  const formik = useFormik({
    initialValues: {
      title: post.title,
      content: post.content,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
      content: Yup.string()
        .max(150, "Must be 150 characters or less")
        .required("Required"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      onSubmit(post, values);
    },
  });

  return (
    <form className="d-flex  justify-content-start align-items-center mt-3 w-100 mb-3 "
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
      <div className="w-75">
        <input type="text" id="title" className="form-control p-1  mb-1"
               value={formik.values.title}
               onChange={formik.handleChange}/>
        {formik.errors.title ? <div className="text-danger">{formik.errors.title}</div> : null}
        <input type="text" id="content" className="form-control p-1"
               value={formik.values.content}
               onChange={formik.handleChange}/>
        {formik.errors.content ? <div className="text-danger">{formik.errors.content}</div> : null}
      </div>
      <Btn name="Save"
           type="submit"
           classBtn=" btn btn-outline-info btn-sm ms-3"/>
    </form>
  );
}