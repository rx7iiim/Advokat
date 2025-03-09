import { useForm } from "../../../../components/contexts/FormContext"
import FirmManager from "./roles/firmManager/FirmManager";
import Individ from "./roles/individLawyer/Individ";
import FirmLawyer from "./roles/FirmLawyer/FirmLawyer";
import styles from "./step1.module.css";

function Step1() {
  const { formData, updateFormData } = useForm(); 

  const handleCheckboxChange = () => {
    updateFormData("firmLawyer", !formData.firmLawyer);
    updateFormData("firmPlan", null); 
    updateFormData("individPlan", null);
    updateFormData("planPrice", null);
    updateFormData("role", formData.firmLawyer ? null : "FirmLawyer");
  };

  const handleRadioChange = (role, plan, planprice) => {
    updateFormData("role", role);
    updateFormData("firmLawyer", false);
    
    if (role === "FirmManager") {
      updateFormData("firmPlan", plan);
      updateFormData("individPlan", null);
      updateFormData("planPrice", planprice);
    } else if (role === "IndividLawyer") {
      updateFormData("individPlan", plan);
      updateFormData("firmPlan", null);
      updateFormData("planPrice", planprice);
    }
  };


  return (
    <div className={styles.container}>
      <form className={styles.formContainer}>
        <FirmManager selectedPlan={formData.firmPlan} handleRadioChange={handleRadioChange} isDisabled={formData.firmLawyer} />
        <Individ selectedPlan={formData.individPlan} handleRadioChange={handleRadioChange} isDisabled={formData.firmLawyer} />
        <FirmLawyer isFirmLawyer={formData.firmLawyer} handleCheckboxChange={handleCheckboxChange} />
      </form>
    </div>
  );
}

export default Step1;
