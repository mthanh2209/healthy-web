import { render } from '@testing-library/react'

import BookList from './book-list'

describe('BookList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookList />)
    expect(baseElement).toBeTruthy()
  })
})
