type Props = {
  children: React.ReactNode;
  className?: string;
};
const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`${
        className ? className : "py-12 lg:py-20"
      } px-4 lg:px-[6.25rem] w-full flex justify-center`}
    >
      <div className="max-w-[1600px] w-full">{children}</div>
    </div>
  );
};

export default Container;
