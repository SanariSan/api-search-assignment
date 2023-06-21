import type { FC } from 'react';
import { Helmet } from 'react-helmet';
import { GH_PAGES_ROUTING } from '../../../const';

type THelmetContainer = {
  [key: string]: unknown;
};

const HelmetContainer: FC<THelmetContainer> = () => (
  <Helmet>
    {/* <style type="text/css">{`${THEME_PREFERENCE_PRELOAD}`}</style> */}
    <script>{`${GH_PAGES_ROUTING}`}</script>
    <meta name="description" content="github.com/SanariSan" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="mobile-web-app-capable" content="yes" />
  </Helmet>
);

export { HelmetContainer };
