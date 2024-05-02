type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "link";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
};

const getVariantClass = (
  variant: ButtonProps["variant"],
  disabled?: boolean
) => {
  switch (variant) {
    case "primary":
      return disabled
        ? "bg-blue-300 text-gray-500 cursor-not-allowed rounded"
        : "bg-blue-500 hover:bg-blue-700 text-white rounded";
    case "secondary":
      return disabled
        ? "bg-gray-300 text-gray-500 cursor-not-allowed rounded"
        : "bg-gray-500 hover:bg-gray-700 text-white rounded";
    case "link":
      return disabled
        ? "text-gray-400 cursor-non-allowed"
        : "text-gray-500 hover:text-gray-700";
  }
};

export default function Button({
  children,
  type,
  variant,
  disabled,
  className,
  onClick,
}: ButtonProps) {
  const variantClasses = getVariantClass(variant, disabled);

  return (
    <button
      disabled={disabled}
      type={type}
      className={`${variantClasses} font-medium py-1 px-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
