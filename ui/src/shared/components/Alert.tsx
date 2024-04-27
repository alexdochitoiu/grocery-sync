type AlertProps = {
  children: React.ReactNode;
  severity: "error" | "success";
  className?: string;
};

const getAlertClasses = (severity: AlertProps["severity"]) => {
  switch (severity) {
    case "error":
      return "bg-red-100 border-red-400 text-red-700";
    case "success":
      return "bg-green-100 border-green-400 text-green-700";
  }
};

const getAlertIcon = (severity: AlertProps["severity"]) => {
  switch (severity) {
    case "error":
      return "⛔";
    case "success":
      return "✅";
  }
};

export default function Alert({ children, severity, className }: AlertProps) {
  const classes = getAlertClasses(severity);
  const icon = getAlertIcon(severity);

  return (
    <div
      className={`border-l-4 text-xs px-4 py-2 rounded-lg shadow ${classes} ${className}`}
      role="alert"
    >
      {icon} {children}
    </div>
  );
}
