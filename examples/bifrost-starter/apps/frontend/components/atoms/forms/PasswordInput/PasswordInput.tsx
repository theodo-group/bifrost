import { useTranslations } from 'next-intl';
import React, { useState } from 'react';

import style from './PasswordInput.module.css';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { EyeClosed } from '../../icons/EyeClosed';
import { EyeOpen } from '../../icons/EyeOpen';
import { Input, InputProps } from '../Input/Input';

export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ ...props }, ref) => {
    const [isPasswordReveled, setIsPasswordReveled] = useState(false);
    const t = useTranslations('generic.password_input');

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
              {isPasswordReveled ? t('hide') : t('show')}
            </VisuallyHidden>
            {isPasswordReveled ? <EyeClosed /> : <EyeOpen />}
          </button>
        }
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
