import { ComponentStyleConfig, defineStyleConfig } from '@chakra-ui/react'

const Button: ComponentStyleConfig = defineStyleConfig({
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'white',
  },

  variants: {
    primary: {
      border: '2px solid',
      borderColor: 'primary',
      bgColor: 'primary',
      _hover: {
        bgColor: 'white',
        color: 'primary',
      },
    },
    secondary: {
      p: '10px 30px',
      bgColor: 'black',
      borderWidth: '3px',
      borderRadius: '3xl',
      borderColor: 'black',
      _hover: {
        bgColor: 'transparent',
        color: 'black',
        textDecoration: 'underline',
      },
    },
    tertiary: {
      px: 8,
      color: 'black',
      _hover: {
        textDecor: 'underline',
        bgColor: 'dust.100',
      },
    },
    outline: {
      fontWeight: 'semibold',
    }
  },

  defaultProps: {
    size: 'md',
  },
})

export default Button
