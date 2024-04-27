type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "link";
  className?: string;
  onClick?: () => void;
};

const getVariantClass = (variant: ButtonProps["variant"]) => {
  switch (variant) {
    case "primary":
      return "bg-blue-500 hover:bg-blue-700 text-white rounded";
    case "secondary":
      return "bg-gray-500 hover:bg-gray-700 text-white rounded";
    case "link":
      return "text-gray-500 hover:text-gray-700";
  }
};

export default function Button({
  children,
  type,
  variant,
  className,
  onClick,
}: ButtonProps) {
  const variantClasses = getVariantClass(variant);

  return (
    <button
      type={type}
      className={`${variantClasses} font-medium py-1 px-4 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
