import React, { InputHTMLAttributes } from 'react';
import style from './Input.module.css';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  id: string;
  label: string;
  type?: string;
  icon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, label, className = '', type = 'text', disabled, icon, ...props },
    ref,
  ) => (
    <div className={`${style.fieldContainer} ${className}`}>
      <label htmlFor={id}>{label}</label>
      <div className={style.inputContainer}>
        <input
          className={style.input}
          id={id}
          type={type}
          {...props}
          disabled={disabled}
          ref={ref}
        />
        <div className={style.iconContainer}>{icon}</div>
      </div>
    </div>
  ),
);

Input.displayName = 'Input';
