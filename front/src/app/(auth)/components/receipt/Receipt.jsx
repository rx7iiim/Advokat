import {React, useState, useEffect} from "react";
import {useForm} from '../../../components/contexts/FormContext';
import { useRouter} from "next/navigation";
import * as dotenv from 'dotenv';

dotenv.config();

function Receipt() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { formData, updateFormData,error, setError,errorText,setErrtext } = useForm();
  const username=formData.username
  const password=formData.password
    async function login (){try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({username,password }),
    });

    if (response.ok) {
      const userData = await response.json();
      document.cookie = `username=${userData.username}; path=/;`;
      router.push(`/user/${userData.username}/home`);
    } else {
      setError("Invalid username or password");
    }
  } catch (err) {
    console.error("Login failed:", err);
    setError("An error occurred. Please try again.");
  }}
  const Login = () => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
  
    // Check if user is already logged in (cookie-based authentication)
    useEffect(() => {
      const username = document.cookie
        .split("; ")
        .find((row) => row.startsWith("username="))
        ?.split("=")[1];
  
      if (username) {
        router.push(`/user/${username}/home`);
      }
    }, [router]);
  
    // Login Function
    const handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
  
      try {
        const response = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // ✅ Ensures cookies are sent/received
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          const userData = await response.json();
          document.cookie = `username=${username}; path=/;`; 
          router.push(`/user/${username}/home`);
        } else {
          setError("Invalid username or password");
        }
      } catch (err) {
        console.error("Login failed:", err);
        setError("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
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
      <button className="w-1/3 transition-all duration-500 bg-blue-600 text-white font-mona font-bold py-3 rounded-md  hover:bg-blue-700"  onClick={login}>Access my profile</button>
    </div>
  );
}

export default Receipt;
