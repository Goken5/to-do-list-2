import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Input({ ...props }: InputProps) {
  return (
    <input
      {...props}
      className="bg-white rounded-3xl w-[80vw] sm:w-[50vw] xl:w-[25vw] p-2 
      focus:scale-110 transition-all duration-300 ease-in-out 
      focus:shadow-black focus:shadow-2xl focus:outline-blue-700 
      hover:cursor-text border border-solid m-3"
    />
  );
}
export function Button({ children, ...props}: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-blue-700 rounded-3xl border-black border-2 py-3 px-10
        hover:scale-110 hover:cursor-pointer transition-all
        text-white font-medium hover:text-black hover:shadow-2xl
        hover:shadow-black mb-3 w-fit sm:w-auto"
    >
      {children}
    </button>
  )
}
