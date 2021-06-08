import {useFormik} from "formik";
import * as Yup from "yup";
import Btn from "../btn/Btn";
import DynamicInput from "../inputs/DynamicInput";

export default function CreateCommentForm({onSubmit}) {

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().
          max(150, "Must be 150 characters or less").
          required("Required"),
    }),
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values);
      formikHelpers.resetForm();
    },
  });

  return (
      <form
          className="d-flex justify-content-center align-items-center w-75 ms-3"
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
        <DynamicInput
            value={formik.values.content}
            placeholder="Comment?"
            onChange={value => formik.setFieldValue("content", value)}
        />
        {formik.errors.content ? <div
            className="text-danger">{formik.errors.content}</div> : null}
        <Btn name="Comment" classBtn="btn-success ms-3 btn-sm" type="submit"/>
      </form>
  );
}