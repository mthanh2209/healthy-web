import { render } from '@testing-library/react'

import Header from './header'

describe('Header', () => {
  const mockFn = vi.fn()

  it('should render successfully', () => {
    const { baseElement } = render(<Header onOpen={mockFn} />)
    expect(baseElement).toBeTruthy()
  })
})
