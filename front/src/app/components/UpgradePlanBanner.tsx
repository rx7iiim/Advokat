
export default function UpgradePlanBanner() {
    return (
      <button className=" flex flex-col items-center bd-white text-white ">
        <h2 className="text-lg font-semibold ">Upgrade Plan</h2>
        <p className="mb-4 text-[14px]">
          Upgrade your plan to get extra storage and manage more costs with ease and
          efficiency.
        </p>
        <div className="bg-white text-l text-blue-600 py-2 px-4 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
          Upgrade Now
        </div>
      </button>
    );
  }