type DigitButtonProps = {
  digit?: number;
  onClick?: (digit: number) => void;
  disabled?: boolean;
  size?: string;
};

const DigitButton: React.FC<DigitButtonProps> = ({
  digit,
  onClick,
  disabled = false,
  size,
}) => {
  return (
    <button
      onClick={() => {
        if (onClick) {
          onClick(digit!);
        }
      }}
      className={`bg-white text-black text-3xl font-bold px-4 py-2 rounded-lg shadow-md ${
        size ? size : "size-12"
      } ${disabled ? "cursor-not-allowed" : "hover:bg-gray-200"}`}
      disabled={disabled}
    >
      {digit}
    </button>
  );
};

export default DigitButton;
