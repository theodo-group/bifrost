import style from './VisuallyHidden.module.css';

type VisuallyHiddenProps = {
  children: React.ReactNode;
};

export const VisuallyHidden = ({ children }: VisuallyHiddenProps) => (
  <span className={style.visuallyHidden}>{children}</span>
);
