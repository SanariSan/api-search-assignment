import { extendTheme /* extendBaseTheme */ } from '@chakra-ui/react';
import { COLORS } from './colors.chakra-setup';
import { Text } from './components.chakra-setup';
import { THEME_CONFIG } from './theme.chakra-setup';

const THEME = extendTheme({
  config: THEME_CONFIG,
  colors: COLORS,
  fonts: {
    body: `'Poppins Regular', sans-serif`,
  },
  components: {
    Text,
    // Input,
    // InputGroup,
  },
  breakpoints: {
    '2xl': '1700px',
    '3xl': '2100px',
  },
  // https://github.com/chakra-ui/chakra-ui/discussions/6095
  styles: {
    global: {
      html: {
        overflow: { base: 'scroll', sm: 'hidden' },
      },
      p: {
        whiteSpace: 'nowrap',
      },
      header: {
        whiteSpace: 'nowrap',
      },
      //     body: {
      //       transitionProperty: "all",
      //       transitionDuration: "ultra-slow"
      //     }
    },
  },
});

export { THEME };
