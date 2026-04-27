import type { ButtonHTMLAttributes, ReactNode } from "react";

const variants = {
  primary:
    "bg-primary text-white border-primary hover:bg-primary-hover hover:border-primary-hover shadow-primary/20",
  secondary: "border-bg-secondary bg-bg-secondary hover:bg-bg-disabled",
  outline: "border-border bg-card hover:border-primary hover:bg-primary-ligh/5",
} as const;

type Variant = keyof typeof variants;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: Variant;
  icon?: ReactNode;
}

function Button({
  label,
  icon,
  variant = "primary",
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={`flex justify-center items-center outline-none focus:shadow-[0_0_0_0.2rem_#bfdbfe] gap-2 border py-2 px-4 rounded-lg transition-all active:scale-[0.98]
        ${variants[variant]}  
        ${
          disabled
            ? "!text-disabled !bg-bg-disabled !border-bg-disabled !shadow-none pointer-events-none"
            : "cursor-pointer"
        } 
        ${className}`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      {label}
    </button>
  );
}

export default Button;
