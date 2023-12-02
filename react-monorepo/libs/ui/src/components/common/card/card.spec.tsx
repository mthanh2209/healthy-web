import { render } from '@testing-library/react'

import Card, { CardProps } from './card'

const props: CardProps = {
  href: '#',
  imageUrl: 'https://bit.ly/naruto-sage',
  name: 'Test',
  author: 'Lorem',
  alt: 'image naruto',
}

describe('Card', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Card {...props} />)
    expect(baseElement).toBeTruthy()
  })
})
