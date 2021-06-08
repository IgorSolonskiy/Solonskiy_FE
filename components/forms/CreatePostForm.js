import {useFormik} from "formik";

import * as Yup from "yup";
import Btn from "../btn/Btn";
import DynamicInput from "../inputs/DynamicInput";

export default function CreatePostForm({onSubmit}) {
  const formik = useFormik({
    initialValues: {
      content: "",
    },
    validationSchema: Yup.object({
      content: Yup.string().
          max(150, "Must be 150 characters or less").
          required("Required"),
    }),
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      onSubmit(values);
      formikHelpers.resetForm();
    },
  });

  return (
      <form
          className="d-flex justify-content-center  align-items-center mt-3 w-100 mb-3"
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
        <DynamicInput
            value={formik.values.content}
            placeholder="What's happening?"
            onChange={e => formik.setFieldValue("content", e)}
        />
        {formik.errors.content ? <div
            className="text-danger">{formik.errors.content}</div> : null}
        <Btn name="Tweet" classBtn="btn-success mx-3" type="submit"/>
      </form>
  );
}