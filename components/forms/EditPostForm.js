import {useFormik} from 'formik';
import * as Yup from 'yup';
import Btn from '../btn/Btn';
import {getSearchUsers} from '../../api/users';
import {getSearchHashtags} from '../../api/tags';
import MentionInput from '../inputs/MentionInput';

export default function EditPostForm({
  onSubmit,
  post = {content: ''},
}) {
  const formik = useFormik({
    initialValues: {
      content: post.content,
      search: '',
      loading: false,
      searchData: [],
    },
    validationSchema: Yup.object({
      content: Yup.string().
          max(150, 'Must be 150 characters or less').
          required('Required'),
    }),
    enableReinitialize: true,
    validateOnChange: false,
    onSubmit: (values) => {
      onSubmit(post, values);
    },
  });

  const handleSearchMentions = async (search, prefix) => {
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

    searchData.length
        ? await formik.setFieldValue('searchData', searchData)
        : await formik.setFieldValue('searchData',
        [{name: 'Type your hashtags'}]);

    await formik.setFieldValue('loading', false);
  };

  return (
      <form
          className="d-flex  justify-content-start align-items-center mt-3 w-100 mb-3 "
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
        <div className="w-75">
          <MentionInput
              value={formik.values.content}
              placeholder="What's happening?"
              onChange={e => formik.setFieldValue('content', e)}
              onSearch={handleSearchMentions}
              loading={formik.values.loading}
              searchData={formik.values.searchData}
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '10px',
                fontSize: '16px',
              }}
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