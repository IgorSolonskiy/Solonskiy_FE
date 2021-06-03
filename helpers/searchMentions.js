import {getSearchUsers} from '../api/users';
import {getSearchHashtags} from '../api/tags';

export const searchMentions = async (search, prefix, formik) => {
  await formik.setFieldValue('searchData', []);
  await formik.setFieldValue('search', search);
  await formik.setFieldValue('loading', !!formik.values.search);

  if (search.length > 1 && !formik.values.searchData.length) {
    await formik.setFieldValue('loading', false);
    return formik.setFieldValue('searchData', []);
  }

  const searchData = prefix === '@'
      ? await getSearchUsers(search)
      : await getSearchHashtags(search);

  await formik.setFieldValue('searchData', searchData);
  await formik.setFieldValue('loading', false);
};