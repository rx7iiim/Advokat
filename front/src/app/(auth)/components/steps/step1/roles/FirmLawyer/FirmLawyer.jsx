import React from "react";

function FirmLawyer({ isFirmLawyer, handleCheckboxChange }) {
  console.log(`${isFirmLawyer} from FirmLawyer`);
  return (
    <div className="w-3xs flex flex-col justify-start gap-[10px]">
      <h1 className="text-center text-2xl">Firm Lawyer</h1>
      <div className="flex flex-col h-48 justify-start items-center gap-4 padding-8">
        <p className="w-[254px] text-sm">
          If you're a lawyer working within a law firm, you don’t need to
          purchase a subscription; your firm has already covered it! <br />
          Since your law firm’s account is managed by the Firm Admin, you can
          access all the tools and features under their plan without any
          additional cost, so just{" "}
          <span className="font-bold">check the box</span> below and click next!
        </p>
        <div className="flex justify-center gap-4 w-full items-center">
          <input
            type="checkbox"
            id="firm-lawyer"
            name="firm-lawyer"
            value="IsFirmLawyer"
            checked={isFirmLawyer}
            onChange={handleCheckboxChange}
            className="w-4 h-4"
          />
          <label htmlFor="firm-lawyer">i am a firm lawyer</label>
        </div>
      </div>
    </div>
  );
}

export default FirmLawyer;
