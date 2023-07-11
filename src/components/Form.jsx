// Render Prop
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, object } from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function FormPage() {
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const storage = localStorage.getItem("access-Token");

  const initialValues = {
    title: "",
    postText: "",
  };
  const PostSchema = object({
    title: string().required().au,
    postText: string().min(10).required(),
  });

  

  const onSubmit = (data) => {
      setSubmit(true);
      axios.post(`${import.meta.env.VITE_PORT}/api/auth/posts`, data,{
        headers: {
          accessToken: storage,
        },
      }).then((res) => {
        // console.log(res);
     
    if (res.status === 200) {
        setSubmit(false);
        navigate("/");
      }
    }).catch((err) => {
      console.log(err.response.data.message);
    });
  };

  const label = `capitalize text-[1.8rem] mb-4 inline-block font-semibold text-[rgba(255,255,255,.5)]`;
  const input = `w-[100%] p-4 text-[1.8rem] font-normal text-black rounded-[.8rem] border-blue-500 border-4 mb-4 `;
  const errorMessage = `text-[1.5rem] font-bold capitalize text-red-600`;
  return (
    <main className="flex flex-col justify-center items-center  p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={PostSchema}
        onSubmit={onSubmit}
      >
        <Form className="sm:w-[500px] w-full flex flex-col">
          <label htmlFor="title" className={label}>
            post title{" "}
          </label>
          <Field autoComplete="off"  type="text" name="title" className={input} />
          <ErrorMessage name="title" component="div" className={errorMessage} />

          <label htmlFor="postText" className={label}>
            post text{" "}
          </label>
          <Field autoComplete="off"  type="text" name="postText" className={input} />
          <ErrorMessage
            name="postText"
            component="div"
            className={errorMessage}
          />

        
          <button
            type="submit"
            disabled={submit}
            className="p-8 text-[2rem] font-semibold rounded-xl my-8 bg-white text-blue-400 shadow-[0_5px_15px_rgba(0,0,0,0.6)] "
          >
            Submit
          </button>
        </Form>
      </Formik>
    </main>
  );
}

export default FormPage;
