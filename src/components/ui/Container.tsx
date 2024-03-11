type Props = {
  children: React.ReactNode;
  className?: string;
};
// py-12 lg:py-24 px-4 lg:px-20
const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`${
        className ? className : "py-12 lg:py-20"
      } px-4 lg:px-[6.25rem] `}
    >
      {children}
    </div>
  );
};

export default Container;
