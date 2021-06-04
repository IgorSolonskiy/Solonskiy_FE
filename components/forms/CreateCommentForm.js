import {useFormik} from "formik";
import * as Yup from "yup";
import Btn from "../btn/Btn";
import MentionInput from "../inputs/MentionInput";
import {searchMentions} from "../../helpers/searchMentions";

export default function CreateCommentForm({onSubmit}) {

  const formik = useFormik({
    initialValues: {
      content: "",
      search: "",
      loading: false,
      searchData: [],
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
        <MentionInput
            value={formik.values.content}
            placeholder="Comment?"
            onChange={e => formik.setFieldValue("content", e)}
            onSearch={(search, prefix) => searchMentions(search, prefix,
                formik)}
            loading={formik.values.loading}
            searchData={formik.values.searchData}
            style={{
              width: "100%",
              height: "30px",
              borderRadius: "10px",
              fontSize: "18px",
            }}
        />
        {formik.errors.content ? <div
            className="text-danger">{formik.errors.content}</div> : null}
        <Btn name="Comment" classBtn="btn-success ms-3 btn-sm" type="submit"/>
      </form>
  );
}