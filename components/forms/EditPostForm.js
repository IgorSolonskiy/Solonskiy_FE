import {useFormik} from "formik";
import * as Yup from "yup";
import Btn from "../btn/Btn";
import {getSearchUsers} from "../../api/users";
import {getSearchHashtags} from "../../api/tags";
import MentionInput from "../inputs/MentionInput";

export default function EditPostForm({
  onSubmit,
  post = {content: "", title: ""},
}) {
  const formik = useFormik({
    initialValues: {
      title: post.title,
      content: post.content,
      search: "",
      loading: false,
      searchData: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().
          max(30, "Must be 30 characters or less").
          required("Required"),
      content: Yup.string().
          max(150, "Must be 150 characters or less").
          required("Required"),
    }),
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values) => {
      onSubmit(post, values);
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
          className="d-flex  justify-content-start align-items-center mt-3 w-100 mb-3 "
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
        <div className="w-75">
          <MentionInput
              value={formik.values.title}
              placeholder="Title?"
              onChange={e => formik.setFieldValue("title", e)}
              onSearch={handleSearchMentions}
              loading={formik.values.loading}
              searchData={formik.values.searchData}
          />
          {formik.errors.title ? <div
              className="text-danger">{formik.errors.title}</div> : null}
          <div className='m-3'></div>
          <MentionInput
              value={formik.values.content}
              placeholder="What's happening?"
              onChange={e => formik.setFieldValue("content", e)}
              onSearch={handleSearchMentions}
              loading={formik.values.loading}
              searchData={formik.values.searchData}
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