import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, object } from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useGlobalContext } from "../components/Context";



function Register() {
  const [submit, setSubmit] = useState(false);
  const { session, setSession } = useGlobalContext();
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };
  const PostSchema = object({
    username: string().min(3).required(),
    password: string().min(6).required(),
  });

  const onSubmit = (data) => {
    setSubmit(true);
    axios
      .post(`${import.meta.env.VITE_PORT}/api/auth`, data)
      .then((res) => {
        //   console.log(res);
        const token = res.data.token;
        const auth = { username: res.data.username, id: res.data.id };
        // console.log(auth);
        const storage = localStorage.getItem("access-Token");
        if (res.status === 201) {
          if (!storage) {
            localStorage.setItem("access-Token", token);
            setSubmit(false);
            setSession(auth);
            navigate("/");
          }else{
            
            axios
            .get(`${import.meta.env.VITE_PORT}/api/auth`, {
              headers: {
                accessToken: storage,
              },
            })
            .then((res) => {
              const authenticate = {
                username: res.data.username,
                id: res.data.id,
              };
              setSession(authenticate);
              navigate("/");
              // console.log(res);
            })
            .catch((err) => {
              console.log("access not granted");
              toast.error("access not granted");
              localStorage.clear();
              localStorage.setItem("access-Token", token);
              setSession(auth);
              navigate("/");
            });
          }
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      });
  };

  const label = `capitalize text-[1.8rem] mb-4 inline-block font-semibold text-[rgba(255,255,255,.5)]`;
  const input = `w-[100%] p-4 text-[1.8rem] font-normal text-black rounded-[.8rem] border-blue-500 border-4 mb-4 `;
  const errorMessage = `text-[1.5rem] font-bold capitalize text-red-600`;


  // console.log(session);
  useEffect(()=>{
    if(session){
      return navigate("/")
    }
  },[session])



  return (
    <main className="flex flex-col justify-center items-center  p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={PostSchema}
        onSubmit={onSubmit}
      >
        <Form className="sm:w-[500px] w-full flex flex-col">
          <label htmlFor="username" className={label}>
            username{" "}
          </label>
          <Field
            autoComplete="off"
            type="text"
            name="username"
            className={input}
          />
          <ErrorMessage
            name="username"
            component="div"
            className={errorMessage}
          />

          <label htmlFor="password" className={label}>
            password{" "}
          </label>
          <Field
            autoComplete="off"
            type="text"
            name="password"
            className={input}
          />
          <ErrorMessage
            name="password"
            component="div"
            className={errorMessage}
          />

          <button
            type="submit"
            className="p-8 text-[2rem] font-semibold rounded-xl my-8 bg-white text-blue-400 shadow-[0_5px_15px_rgba(0,0,0,0.6)] "
          >
            Submit
          </button>
        </Form>
      </Formik>
      <span className="cursor-pointer text-[2rem] font-semibold" onClick={()=>navigate("/login")}>Click here if you already have an account</span>
    </main>
  );
}

export default Register;
