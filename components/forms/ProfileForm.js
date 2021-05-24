import { Avatar } from "../image/Avatar";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import Btn from "../btn/Btn";

export default function ProfileForm ({ onSubmit }) {
  const { profile } = useSelector(state => state.profile);

  const formik = useFormik({
    initialValues: {
      name: profile.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      let formData = new FormData();

      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      formData.append("name", values.name);
      formData.append("_method", "PUT");
      onSubmit(formData, formik);
    },
  });

  const handleChangeAvatar = (event) => formik.setFieldValue("avatar", event.currentTarget.files[0]);

  const previewAvatar = formik.values.avatar
    ? <Avatar avatar={URL.createObjectURL(formik.values.avatar)} size={150}/>
    : <Avatar avatar={profile.avatar} name={profile.name} size={150}/>;

  return (
    <form className="d-flex flex-column justify-content-center align-items-center mt-3 w-100"
          autoComplete="off"
          onSubmit={formik.handleSubmit}>
      <label htmlFor="avatar"
             className="btn position-relative p-3 border-0 w-100 mb-3"
             style={{ backgroundColor: "#B3E5FC" }}
             title="Change your avatar">
        <input type="file" id="avatar" className="d-none"
               value={formik.initialValues.avatar}
               onChange={handleChangeAvatar}/>
        {previewAvatar}
        <h4>{profile.username}</h4>
      </label>
      <label htmlFor="name" className="form-label text-center m-0  w-100 d-flex align-items-center">
        <span style={{ width: "100px", fontWeight: "bold" }}>Full Name</span>
        <input type="text" id="name" className="form-control w-100 ms-3"
               value={formik.values.name}
               onChange={formik.handleChange}
               placeholder="Title?"/>
        {formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
      </label>
      <Btn name="Save" classBtn="btn btn-outline-info w-100 mt-3" type="submit"/>
    </form>
  );
}