import { FC, PropsWithChildren } from 'react';
import 'styles/global.css';
import 'styles/stylesheet.css';
// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
const RootLayout: FC<PropsWithChildren> = ({ children }) => children;

export default RootLayout;
