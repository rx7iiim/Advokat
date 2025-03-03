import React from "react";
import styles from "./step2.module.css";
import Inpute from './Inpute';
import Divider from '@mui/material/Divider';
import GoogleLogin from './GoogleLogin';

function Step2() {
  const inputs = [
    {
      label: "First Name",
      placeholder: "ex: hamid",
      name: "firstName",
      type: "text",
    },
    {
      label: "Last Name",
      placeholder: "ex: boufettah",
      name: "lastName",
      type: "text",
    },
    {
      label: "email",
      placeholder: "ex: hamidfetouh@gmail.com",
      name: "email",
      type: "email",
    },
    {
      label: "Username",
      placeholder: "ex: hamidou",
      name: "userName",
      type: "text",
    },
    {
      label: "Password",
      placeholder: "write your password",
      name: "password",
      type: "password",
    },
    {
      label: "Confirm password",
      placeholder: "rewrite your password",
      name: "confirmedPassword",
      type: "password",
    },
  ];

  return (
  <div className={styles.container}>
   <form className={styles.formCont}>
    {inputs.map((inp,index)=>(
        <Inpute elem={inp} key={index} />
    ))}
   </form>
   <div>
   <Divider className="w-[250px] font-bold text-[#898989]" orientation="horizontal" flexItem>OR</Divider>
   </div>
   <GoogleLogin />
  </div>
  )
}

export default Step2;
