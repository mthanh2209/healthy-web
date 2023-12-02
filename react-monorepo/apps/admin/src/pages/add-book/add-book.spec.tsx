import { render } from '@testing-library/react'

import AddBook from './add-book'

describe('AddBookPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddBook />)
    expect(baseElement).toBeTruthy()
  })
})
