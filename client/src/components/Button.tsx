import clsx from "clsx";

type Props = {
  className?: string;
  children: string;
  disabled?: boolean;
};

const Button = (props: Props) => {
  const { className, children, ...rest } = props;
  const classNames = clsx({ btn: true }, className);

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

export default Button;
