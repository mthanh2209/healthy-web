import { render } from '@testing-library/react'

import BookDetail from './book-detail'

describe('BookDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BookDetail />)
    expect(baseElement).toBeTruthy()
  })
})
