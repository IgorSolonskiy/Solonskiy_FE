import { getSearchUsers } from "../api/users";
import { getSearchHashtags } from "../api/tags";

export const searchMentions = async (search, prefix, formik) => {
  formik.setFieldValue("search", search);
  formik.setFieldValue("loading", !!formik.values.search);

  if (search.length > 1 && !formik.values.searchData.length) {
    return formik.setFieldValue("loading", false);
  }

  const searchData = prefix === "@"
    ? await getSearchUsers(search)
    : await getSearchHashtags(search);

  formik.setFieldValue("searchData", searchData);
  formik.setFieldValue("loading", false);
};