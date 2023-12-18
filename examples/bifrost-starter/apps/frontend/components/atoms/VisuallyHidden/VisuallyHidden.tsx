import { FC } from 'react';

import style from './VisuallyHidden.module.css';

type VisuallyHiddenProps = {
  children: React.ReactNode;
};

export const VisuallyHidden: FC<VisuallyHiddenProps> = ({ children }) => (
  <span className={style.visuallyHidden}>{children}</span>
);
