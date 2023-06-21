// import chakraTheme from '@chakra-ui/theme';
// const { Input } = chakraTheme.components.Input;

const Text = {
  variants: {
    base: {
      fontSize: '14px',
    },
    xs: {
      fontSize: '12px',
    },
    sm: {
      fontSize: '14px',
    },
    md: {
      fontSize: '16px',
    },
    lg: {
      fontSize: '18px',
    },
    xxxl: {
      fontSize: '28px',
    },
    xxxxl: {
      fontSize: '36px',
    },
  },
  defaultProps: {
    variant: 'base',
  },
};

// const Input = {
//   variants: {
//     base: {
//       fontSize: '14px',
//       color: 'green.500',
//     },
//     sm: {
//       fontSize: '16px',
//       color: 'red.500',
//     },
//   },
//   defaultProps: {
//     variant: 'base',
//   },
// };
// const InputGroup = {
//   variants: {
//     base: {
//       fontSize: '14px',
//       color: 'green.500',
//     },
//     sm: {
//       fontSize: '16px',
//       color: 'red.500',
//     },
//   },
//   defaultProps: {
//     variant: 'base',
//   },
// };

export { Text };
