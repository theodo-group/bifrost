import { FC } from 'react';

export const EyeOpen: FC<{ className?: string }> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.0525 12C4.1165 12.179 4.2095 12.41 4.3325 12.682C4.6725 13.433 5.1135 14.185 5.6605 14.882C7.2015 16.843 9.2685 18 11.9995 18C14.7315 18 16.7975 16.843 18.3385 14.882C18.8865 14.185 19.3265 13.433 19.6665 12.682C19.7895 12.41 19.8825 12.179 19.9475 12C19.8825 11.821 19.7895 11.59 19.6665 11.318C19.3265 10.567 18.8865 9.815 18.3385 9.118C16.7975 7.157 14.7315 6 11.9995 6C9.2685 6 7.2015 7.157 5.6605 9.118C5.1135 9.815 4.6725 10.567 4.3325 11.318C4.2095 11.59 4.1165 11.821 4.0525 12ZM2.0375 11.725C2.3215 10.736 2.9655 9.312 4.0885 7.882C5.9855 5.468 8.6065 4 11.9995 4C15.3935 4 18.0145 5.468 19.9105 7.882C21.0335 9.312 21.6785 10.736 21.9615 11.725C22.0125 11.905 22.0125 12.095 21.9615 12.275C21.6785 13.264 21.0335 14.688 19.9105 16.118C18.0145 18.532 15.3935 20 11.9995 20C8.6065 20 5.9855 18.532 4.0885 16.118C2.9655 14.688 2.3215 13.264 2.0375 12.275C1.9875 12.095 1.9875 11.905 2.0375 11.725ZM11.9995 16C9.7905 16 7.9995 14.209 7.9995 12C7.9995 9.791 9.7905 8 11.9995 8C14.2085 8 15.9995 9.791 15.9995 12C15.9995 14.209 14.2085 16 11.9995 16ZM11.9995 14C13.1045 14 13.9995 13.104 13.9995 12C13.9995 10.896 13.1045 10 11.9995 10C10.8955 10 9.9995 10.896 9.9995 12C9.9995 13.104 10.8955 14 11.9995 14Z"
      fill="currentColor"
    />
  </svg>
);
