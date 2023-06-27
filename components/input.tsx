import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export default function Input({ name, label, ...rest }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        className="bg-slate-100 rounded p-1"
        id={name}
        name={name}
        {...rest}
      />
    </div>
  );
}
