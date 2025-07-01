type ButtonProps = {
  label: string;
  variant: "primary" | "secondary" | "danger";
  handler: (params?: unknown) => void;
};

const Button: React.FC<ButtonProps> = ({ handler, variant, label }) => {
  const styles: Record<typeof variant, string> = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-yellow-500 hover:bg-yellow-600 text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };
  return (
    <button
      onClick={handler}
      className={styles[variant || "primary"] + " px-3 py-2  rounded"}
    >
      {label}
    </button>
  );
};

export default Button;
