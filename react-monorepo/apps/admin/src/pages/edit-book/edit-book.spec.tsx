import { render } from '@testing-library/react'

import EditBook from './edit-book'

describe('EditBookPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditBook />)
    expect(baseElement).toBeTruthy()
  })
})
