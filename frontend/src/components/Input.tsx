import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`
        w-full px-4 py-3 
        border border-gray-300 rounded-lg
        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
        focus:outline-none
        focus:scale-105
        ease-in-out
        transition-all duration-300
        bg-white
        ${className}
      `}
    />
  );
}

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-full px-6 py-3
        bg-blue-600 text-white 
        rounded-lg
        font-medium
        hover:bg-blue-700 
        active:bg-blue-800
        hover:scale-105
        hover:cursor-pointer
        ease-in-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}