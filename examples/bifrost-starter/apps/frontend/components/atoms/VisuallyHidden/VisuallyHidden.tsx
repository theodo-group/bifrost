import style from './VisuallyHidden.module.css';

type VisuallyHiddenProps = {
  children: React.ReactNode;
};

export const VisuallyHidden = ({
  children,
}: VisuallyHiddenProps): JSX.Element => (
  <span className={style.visuallyHidden}>{children}</span>
);
