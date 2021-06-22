import { useFormik } from "formik";
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export default function SearchForm({onSubmit, searchUser}) {
    const formik = useFormik({
        initialValues: {
            name: searchUser ? searchUser : '',
        },
        validateOnChange: false,
        enableReinitialize: true,
        onSubmit: (values) => {
            onSubmit(values.name);
        },
    });

  return (
    <div className="w-100 d-flex justify-content-end mt-3">
      <form autoComplete="off" className="d-flex flex-column h-100 w-100" onSubmit={formik.handleSubmit}>
        <input type="text" id="name" className='form-control form-control-sm mb-1' value={formik.values.name}
               onChange={formik.handleChange} placeholder="Username?"/>
        <Button type='submit' icon={<SearchOutlined />}>Search</Button>
      </form>
    </div>
  );
}