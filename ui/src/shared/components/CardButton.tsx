type CardButtonProps = {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
};

export default function CardButton({
  icon,
  title,
  description,
  onClick,
}: CardButtonProps) {
  return (
    <button
      className="group w-[600px] flex items-center justify-between gap-10 px-6 py-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition duration-300 ease-in-out"
      onClick={onClick}
    >
      <span className="text-5xl group-hover:translate-x-1/3 transition duration-300 ease-in-out">
        {icon}
      </span>
      <div className="text-left">
        <h2 className="text-lg font-semibold text-gray-700 group-hover:text-black">
          {title}
        </h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
}
