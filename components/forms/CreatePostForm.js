import {useFormik} from "formik";
import {getSearchUsers} from "../../api/users";
import {getSearchHashtags} from "../../api/tags";

import * as Yup from "yup";
import Btn from "../btn/Btn";
import MentionInput from "../inputs/MentionInput";

export default function CreatePostForm({onSubmit}) {
  const formik = useFormik({
    initialValues: {
      search: "",
      loading: false,
      searchData: [],
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

  const handleSearchMentions = async (search, prefix) => {
    await formik.setFieldValue("searchData", []);
    await formik.setFieldValue("search", search);
    await formik.setFieldValue("loading", !!formik.values.search);

    if (search.length > 1 && !formik.values.searchData.length) {
      await formik.setFieldValue("loading", false);
      return formik.setFieldValue("searchData", []);
    }

    if (prefix === "@") {
      const searchData = await getSearchUsers(search);

      await formik.setFieldValue("searchData", searchData);
    } else {
      const searchData = await getSearchHashtags(search);
      const uniqueSearchData = Array(
          ...new Set(searchData.map(tag => tag.name)));

      await formik.setFieldValue("searchData", uniqueSearchData);
    }

    await formik.setFieldValue("loading", false);
  };

  return (
      <form
          className="d-flex justify-content-center  align-items-center mt-3 w-100 mb-3"
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
        <MentionInput
            value={formik.values.content}
            placeholder="What's happening?"
            onChange={e => formik.setFieldValue("content", e)}
            onSearch={handleSearchMentions}
            loading={formik.values.loading}
            searchData={formik.values.searchData}
            style={{
              width: '50%',
              height: '40px',
              borderRadius: '10px',
              fontSize: '22px',
            }}
        />
        {formik.errors.content ? <div
            className="text-danger">{formik.errors.content}</div> : null}
        <Btn name="Tweet" classBtn="btn-success mx-3" type="submit"/>
      </form>
  );
}

