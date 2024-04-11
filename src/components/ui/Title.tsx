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
            fontSize ? fontSize : "text-3xl lg:text-5xl text-center"
          } ${className}`}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`${
            fontSize ? fontSize : "text-3xl lg:text-4xl text-center"
          } ${className}`}
        >
          {children}
        </h2>
      );
  }
};

export default Title;
