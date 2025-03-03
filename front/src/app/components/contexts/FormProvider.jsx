import { createContext, useContext, useState } from "react";


const FormContext = createContext();


export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    role: null,
    firmPlan: null,
    individPlan: null,
    firmLawyer: false,
    name: '',
    email: '',
    phone: '',
    username: '',
  });

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// Custom Hook for easy access
export const useForm = () => useContext(FormContext);