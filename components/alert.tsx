import cx from "classnames";

type Props = {
  message: string;
  type: "success" | "warning" | "error";
};

export default function Alert({ message, type }: Props) {
  return (
    <div
      className={cx("p-2 rounded", {
        "bg-green-700 text-green-100": type === "success",
        "bg-red-700 text-red-100": type === "error",
        "bg-orange-700 text-orange-100": type === "warning",
      })}
    >
      {message}
    </div>
  );
}
