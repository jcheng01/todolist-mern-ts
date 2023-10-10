import clsx from "clsx";

const Button = (props) => {
  const { className, children, ...rest } = props;
  const classNames = clsx({ btn: true }, className);

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};

export default Button;
