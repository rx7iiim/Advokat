import React from "react";
import {useForm} from '../../../components/contexts/FormContext';
import { useRouter } from "next/navigation";

function Receipt() {
  const router = useRouter();
  const { formData, updateFormData } = useForm();
  const username=formData.username
  const password=formData.password
    async function login (){try {
    const response = await fetch(`http://localhost:5008/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ✅ Ensures cookies are sent/received
      body: JSON.stringify({username,password }),
    });

    if (response.ok) {
      const userData = await response.json();
      document.cookie = `username=${userData.username}; path=/;`; // ✅ Set username cookie
      router.push(`/user/${userData.username}/home`);
    } else {
      setError("Invalid username or password");
    }
  } catch (err) {
    console.error("Login failed:", err);
    setError("An error occurred. Please try again.");
  } finally {
    setLoading(false);
  }}

  return (
    <div className="flex flex-col w-1/3 h-[80vh] items-center justify-around">
        <h2 className="text-3xl font-bold font-mona">Purchase Confirmed</h2>
        <div className="w-full flex flex-col gap-[10px] justify-between shadow-[1px_5px_28px_1px_rgba(0,0,0,0.75)] p-[10px] rounded-2xl">
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Name:</p>
        <p>{formData.payment.CardName}</p>
      </div> 
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Purchase Date:</p>
        <p>20.20.2020</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Plan:</p>
        <p>{`${formData.role}-${formData.firmPlan ? formData.firmPlan : formData.individPlan}`}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Payment method:</p>
        <p>{formData.payment.paymentMethod}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Card Number:</p>
        <p>{formData.payment.CardNumber}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <p>Expiration Date:</p>
        <p>{formData.payment.CardExpiration}</p>
      </div>
      <div className="flex flex-row justify-between w-full font-mona">
        <span></span>
      <button className="text-gray-500">Download receipt</button>
      </div>
      </div>
      <button onClick={login}>Access my profile</button>
    </div>
  );
}

export default Receipt;
