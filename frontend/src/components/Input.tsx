import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="bg-white rounded-3xl w-[80vw] sm:w-[50vw] xl:w-[25vw] p-2 
      focus:scale-110 transition-all duration-300 ease-in-out 
      focus:shadow-[0px_15px_50px_0px] focus:outline-blue-700 
      hover:cursor-text border border-solid m-3"
    />
  );
}