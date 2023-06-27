import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  hint?: string;
}

export default function Input({ name, label, hint, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium" htmlFor={name}>
        {label}
      </label>
      <input
        className="bg-slate-100 rounded p-1"
        id={name}
        name={name}
        {...rest}
      />
      <span className="text-xs italic text-gray-600">{hint}</span>
    </div>
  );
}
