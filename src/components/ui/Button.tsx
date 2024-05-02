import Link from "next/link";
import Loader from "./Loader";

type Props = {
  label: string;
  link?: string;
  className?: string;
  openNewTab?: boolean;
  onClick?: () => void;
  loading?: boolean;
  secondary?: boolean;
  submit?: boolean;
};

const Button = ({
  label,
  link,
  className,
  openNewTab,
  onClick,
  loading,
  secondary,
  submit,
}: Props) => {
  const styles =
    "text-sm lg:text-base font-medium text-white border rounded-md py-3 px-6 cursor-pointer hover:bg-primary/80 bg-primary";
  const secondaryStyles =
    "text-sm lg:text-base lg:text-base text-primary border-b border-b-primary hover:text-primary/60 hover:border-b-primary/60";
  if (link) {
    return (
      <div className={`${className}`}>
        <Link
          target={openNewTab ? "_blank" : undefined}
          className={`${secondary ? secondaryStyles : styles}`}
          href={link}
        >
          {loading ? <Loader /> : label}
        </Link>
      </div>
    );
  }

  return (
    <button
      type={submit ? "submit" : "button"}
      onClick={onClick}
      className={`${className} ${secondary ? secondaryStyles : styles}`}
    >
      {loading ? <Loader /> : label}
    </button>
  );
};

export default Button;
