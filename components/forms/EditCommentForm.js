import { useFormik } from "formik";
import * as Yup from "yup";
import Btn from "../btn/Btn";
import DynamicInput from "../inputs/DynamicInput";

export default function EditCommentForm ({ onSubmit, comment = { content: "" } }) {

  const formik = useFormik({
    initialValues: {
      content: comment.content,
    },
    validationSchema: Yup.object({
      content: Yup.string()
      .max(150, "Must be 150 characters or less")
      .required("Required"),
    }),
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      onSubmit(comment, values);
    },
  });

  return (
      <form className="d-flex  justify-content-start align-items-center w-100 mt-3 mb-0   "
            autoComplete="off"
            onSubmit={formik.handleSubmit}>
        <div className="w-75">
          <DynamicInput
              value={formik.values.content}
              onChange={value => formik.setFieldValue("content", value)}
          />
          {formik.errors.content ? <div
              className="text-danger">{formik.errors.content}</div> : null}
        </div>
        <Btn name="Save"
             type="submit"
             classBtn=" btn btn-outline-info btn-sm ms-3"/>
      </form>
  );
}