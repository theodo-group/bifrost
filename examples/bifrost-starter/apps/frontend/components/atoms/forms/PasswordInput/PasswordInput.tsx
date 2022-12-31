import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { VisuallyHidden } from '../../VisuallyHidden';
import { EyeClosed, EyeOpen } from '../../icons';
import { Input, InputProps } from '../Input';
import style from './PasswordInput.module.css';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [isPasswordReveled, setIsPasswordReveled] = useState(false);

    return (
      <Input
        {...props}
        type={isPasswordReveled ? 'text' : 'password'}
        ref={ref}
        className={style.paddedInput}
        icon={
          <button
            className={style.revealPassword}
            onClick={() => {
              setIsPasswordReveled(
                currentIsPasswordReveled => !currentIsPasswordReveled,
              );
            }}
            type="button"
          >
            <VisuallyHidden>
              {isPasswordReveled ? (
                <FormattedMessage
                  id="generic.password_input.hide_password"
                  defaultMessage="Hide password"
                />
              ) : (
                <FormattedMessage
                  id="generic.password_input.show_password"
                  defaultMessage="Show password"
                />
              )}
            </VisuallyHidden>
            {isPasswordReveled ? <EyeClosed /> : <EyeOpen />}
          </button>
        }
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
