type Props = {
  h: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children: React.ReactNode;
  className?: string;
  fontSize?: string;
};

const Title = ({ h, children, className, fontSize }: Props) => {
  switch (h) {
    case "h1":
      return (
        <h1
          className={`${
            fontSize ? fontSize : "text-3xl lg:text-5xl"
          } ${className}`}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`${
            fontSize ? fontSize : "text-3xl lg:text-4xl"
          } ${className}`}
        >
          {children}
        </h2>
      );
    case "h3":
      return <h3 className={`${className}`}>{children}</h3>;
    case "h4":
      return <h4 className={`${className}`}>{children}</h4>;
    case "h5":
      return (
        <h5 className={`${fontSize ? fontSize : "text-xl"} ${className}`}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={`${fontSize ? fontSize : "text-lg"} ${className}`}>
          {children}
        </h6>
      );
  }
};

export default Title;
