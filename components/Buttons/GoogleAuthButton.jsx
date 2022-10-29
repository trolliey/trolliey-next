import Image from "next/image";
import React from "react";
import google from "../../public/svg/google.svg";

function GoogleAuthButton({ onClick, loading }) {
  return (
    <div
      onClick={loading ? () => console.log("button is still loading") : onClick}
      className="grid items-center content-center hover:bg-gray-200 bg-gray-100 cursor-pointer justify-center p-2 w-full border-2 border-gray-100 rounded-lg"
    >
      <div className="flex flex-row items-center space-x-4">
        {!loading && (
          <Image src={google} height={20} width={20} alt="google svg icon " />
        )}
        {loading ? (
          <p className="text-gray-800 text-lg font-semibold">Loading ...</p>
        ) : (
          <p className="text-gray-800 text-lg font-semibold">Google</p>
        )}
      </div>
    </div>
  );
}

export default GoogleAuthButton;
