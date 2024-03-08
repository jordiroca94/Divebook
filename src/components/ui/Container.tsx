type Props = {
  children: React.ReactNode;
  className?: string;
};
// py-12 lg:py-24 px-4 lg:px-20
const Container = ({ children, className }: Props) => {
  return (
    <div className={`${className} px-4 lg:px-[6.25rem] py-12 lg:py-20`}>
      {children}
    </div>
  );
};

export default Container;
