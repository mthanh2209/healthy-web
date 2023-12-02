import { render } from '@testing-library/react'

import BookForm from './book-form'

describe('BookForm', () => {
  const mockFn = vi.fn()

  it('should render successfully', () => {
    const { baseElement } = render(<BookForm onSubmit={mockFn} />)
    expect(baseElement).toBeTruthy()
  })
})
