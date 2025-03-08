"use client";

import React, { useState } from "react";

const Pricing = () => {
  const [activePlan, setActivePlan] = useState("law-firm");

  return (
    <div id="pricing" className="p-6 md:p-10 bg-white min-h-screen flex justify-center items-center">
      <div className="shadow-lg rounded-xl p-6 md:p-10 max-w-3xl w-full bg-white md:bg-gray-100 md:min-w-[160vh] md:min-h-[90vh]">
        {/* ✅ العنوان وأزرار التبديل */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
          Advokat Pricing
        </h2>

        {/* ✅ أزرار التبديل مع شريط متحرك */}
        <div className="mt-6 relative flex justify-center space-x-6 ">
          <button
            className={`text-xl font-semibold transition-all ${
              activePlan === "law-firm" ? "text-customGray" : "text-black"
            }`}
            onClick={() => setActivePlan("law-firm")}
          >
            Law Firm
          </button>

          <button
            className={`text-xl font-semibold transition-all ${
              activePlan === "individual-lawyer" ? "text-customGray" : "text-black"
            }`}
            onClick={() => setActivePlan("individual-lawyer")}
          >
            Individual Lawyer
          </button>

          {/* ✅ الشريط المتحرك */}
          <div
  className="mt-9 absolute bottom-0 h-1  transition-all duration-300 "
  style={{
    width: "110px",
    transform: activePlan === "law-firm" ? "translateX(-128px)" : "translateX(40px)",
    backgroundColor: activePlan === "law-firm" || activePlan === "individual-lawyer" ? "#2563eb" : "#4B5563", // أزرق عند التحديد، رمادي غامق عند عدم التحديد
    left: "520px",
    top: "1px",
  }}
/>
        </div>

        {/* ✅ عرض الباقات بناءً على الحالة */}
        <div className="mt-16 flex flex-col md:flex-row justify-center gap-6 mb-4">
          {activePlan === "law-firm" ? (
            <>
              {/* ✅ باقة Starter */}
              <div className="bg-gray-50 shadow-2xl rounded-xl p-6  md:w-1/2 items-start  border w-full   hover:border-b-2 hover:border-customGray transition duration-200 pb-1 " 
              
              style={{
    width: "280px",  // تحديد الموقع الأفقي
    height: "300px",  // تحديد الموقع العمودي
  }}>
                <h3 className="text-3xl font-bold mb-6 ml-4">Starter</h3>
                <p className="text-xl font-semibold text-gray-800 mt-2">15,000 DZD/month</p>
                <p className="text-sm text-gray-400">Can Cancel Anytime</p>
                <ul className="mt-4 text-gray-700">
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">Cases:</span> <span className="ml-28 text-gray-500"> 50</span></li>
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">storag: </span> <span className="ml-24 text-gray-500"> 50GB</span></li>
                </ul>
                <div className="flex justify-center items-center">
  <button className="mt-8 w-3/4 py-2 bg-customGray text-white rounded-3xl hover:bg-blue-600 transition-colors">
    Get Started
  </button>
</div>
              </div>

              {/* ✅ باقة Growth */}
              <div className="bg-gray-50 shadow-2xl rounded-xl p-6  md:w-1/2 items-start  border w-full   hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1"   style={{
    width: "280px",  // تحديد الموقع الأفقي
    height: "300px",  // تحديد الموقع العمودي
  }}>
                <h3 className="text-3xl font-bold mb-6 ml-4">Growth</h3>
                <p className="text-xl font-semibold text-gray-800 mt-2">30,000 DZD/month</p>
                <p className="text-sm text-gray-400">Can Cancel Anytime</p>
                <ul className="mt-4 text-gray-700">
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">Cases:</span> <span className="ml-28 text-gray-500"> 50</span></li>
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">storag: </span> <span className="ml-24 text-gray-500"> 50GB</span></li>
                </ul>
                <div className="flex justify-center items-center">
  <button className="mt-8 w-3/4 py-2 bg-customGray text-white rounded-3xl hover:bg-blue-600 transition-colors">
    Get Started
  </button>
</div>
              </div>
            </>
          ) : (
            <>
              {/* ✅ باقة Individual Basic */}
              <div className="bg-gray-50 shadow-2xl rounded-xl p-6  md:w-1/2 items-start  border w-full   hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1"   style={{
    width: "280px",  // تحديد الموقع الأفقي
    height: "300px",  // تحديد الموقع العمودي
  }}>
                <h3 className="text-3xl font-bold mb-6 ml-4">Basic</h3>
                <p className="text-xl font-semibold text-gray-800 mt-2">10,000 DZD/month</p>
                <p className="text-sm text-gray-400">Can Cancel Anytime</p>
                <ul className="mt-4 text-gray-700">
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">Cases:</span> <span className="ml-28 text-gray-500"> 50</span></li>
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">storag: </span> <span className="ml-24 text-gray-500"> 50GB</span></li>
                </ul>
                <div className="flex justify-center items-center">
  <button className="mt-8 w-3/4 py-2 bg-customGray text-white rounded-3xl hover:bg-blue-600 transition-colors">
    Get Started
  </button>
</div>
              </div>

              {/* ✅ باقة Individual Pro */}
              <div className="bg-gray-50 shadow-2xl rounded-xl p-6  md:w-1/2 items-start  border w-full   hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1"   style={{
    width: "280px",  // تحديد الموقع الأفقي
    height: "300px",  // تحديد الموقع العمودي
  }}>
                <h3 className="text-3xl font-bold mb-6 ml-4">Pro</h3>
                <p className="text-xl font-semibold text-gray-800 mt-4">20,000 DZD/month</p>
                <p className="text-sm text-gray-400">Can Cancel Anytime</p>
                <ul className="mt-4 text-gray-700">
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">Cases:</span> <span className="ml-28 text-gray-500"> 50</span></li>
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">storag: </span> <span className="ml-24 text-gray-500"> 50GB</span></li>
                </ul>
                <div className="flex justify-center items-center">
  <button className="mt-8 w-3/4 py-2 bg-customGray text-white rounded-3xl hover:bg-blue-600 transition-colors">
    Get Started
  </button>
</div>
              </div>

              <div className="bg-gray-50 shadow-2xl rounded-xl p-6  md:w-1/2 items-start  border w-full   hover:border-b-2 hover:border-blue-600 transition duration-200 pb-1"   style={{
    width: "280px",  // تحديد الموقع الأفقي
    height: "300px",  // تحديد الموقع العمودي
  }}>
                <h3 className="text-3xl font-bold mb-6 ml-4">premuim</h3>
                <p className="text-xl font-semibold text-gray-800 mt-2">10,000 DZD/month</p>
                <p className="text-sm text-gray-400">Can Cancel Anytime</p>
                <ul className="mt-4 text-gray-700">
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">Cases:</span> <span className="ml-28 text-gray-500"> 50</span></li>
                  <li> <span className="text-xl font-semibold text-gray-800 ml-4">storag: </span> <span className="ml-24 text-gray-500"> 50GB</span></li>
                </ul>
                <div className="flex justify-center items-center">
  <button className="mt-8 w-3/4 py-2 bg-customGray text-white rounded-3xl hover:bg-blue-600 transition-colors">
    Get Started
  </button>
</div>
              </div>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
