import { Global } from '@emotion/react';

export const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Poppins Regular';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url('./fonts/Poppins-Regular.woff') format('woff');
      }
      /* latin */
      @font-face {
        font-family: 'Poppins Medium';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url('./fonts/Poppins-Medium.woff') format('woff');
      }
      /* latin */
      @font-face {
        font-family: 'Poppins SemiBold';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url('./fonts/Poppins-SemiBold.woff') format('woff');
      }
      /* latin */
      @font-face {
        font-family: 'Poppins Bold';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./fonts/Poppins-Bold.woff') format('woff');
      }
      `}
  />
);
