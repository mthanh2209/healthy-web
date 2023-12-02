import { ThemeOverride } from '@chakra-ui/react'

const styles: ThemeOverride = {
  colors: {
    black: '#000',
    white: '#fff',
    primary: '#4bc1d2',
    secondary: '#fff',
    dust: {
      50: '#f6f6f6',
      100: '#edf2f7',
      200: '#8a8a8a',
    },
    green: {
      50: '#00974f',
      100: '#d2fde6',
    },
    red: {
      50: '#d91a1a',
      100: '#fff3f2',
      200: '#ff5252',
    },
    blue: {
      50: '#004fcf',
      100: '#ddebff',
    },
  },

  shadows: {
    book_card: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    form: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  }
}

export default styles
