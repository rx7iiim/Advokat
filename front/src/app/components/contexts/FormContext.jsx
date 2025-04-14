import { createContext, useContext, useState } from "react";


const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    role: null, // 'FirmManager', 'FirmLawyer', 'IndividLawyer'
    firmPlan: null,
    individPlan: null,
    firmLawyer: true,
    planPrice : null,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    username: '',
    confirmedPassword: '',
    payment : {
      paymentMethod: 'CIB',
      CardNumber: null,
      CardExpiration: null,
      CardCVV: null,
      CardName: '',
    }
    
  });

  const [error, setError] = useState(false);
  const [errorText, setErrtext] = useState("");

  // Update function
  const updateFormData = (field, value) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [field]: value };
      console.log("Updated Form Data:", updatedFormData); // ✅ Logs correctly
      return updatedFormData;
    });
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, error, setError, errorText, setErrtext }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook for easy access
export const useForm = () => useContext(FormContext);