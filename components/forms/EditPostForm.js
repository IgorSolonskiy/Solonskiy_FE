import {useFormik} from 'formik';

import * as Yup from 'yup';
import Btn from '../btn/Btn';
import DynamicInput from '../inputs/DynamicInput';

export default function EditPostForm({
  onSubmit,
  post = {content: ''},
}) {
  const formik = useFormik({
    initialValues: {
      content: post.content,
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

  return (
      <form
          className="d-flex  justify-content-start align-items-center mt-3 w-100 mb-3 "
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
        <div className="w-75">
          <DynamicInput
              value={formik.values.content}
              onChange={e => formik.setFieldValue('content', e)}
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