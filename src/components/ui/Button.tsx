import Link from "next/link";

type Props = {
  label: string;
  link?: string;
  className?: string;
  openNewTab?: boolean;
  submit?: boolean;
  onClick?: () => void;
};

const Button = ({
  label,
  link,
  className,
  openNewTab,
  submit,
  onClick,
}: Props) => {
  const styles =
    "text-base font-bold text-white border rounded-md py-3 px-6 cursor-pointer hover:bg-primary/80 bg-primary";
  if (link) {
    return (
      <div className={`${className}`}>
        <Link
          target={openNewTab ? "_blank" : undefined}
          className={`${styles}`}
          href={link}
        >
          {label}
        </Link>
      </div>
    );
  }

  return (
    <button onClick={onClick} className={`${className} ${styles}`}>
      {label}
    </button>
  );
};

export default Button;
