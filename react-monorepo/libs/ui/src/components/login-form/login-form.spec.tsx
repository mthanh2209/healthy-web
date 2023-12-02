import { render } from '@testing-library/react'

import LoginForm from './login-form'

describe('LoginForm', () => {
  const mockFn = vi.fn()

  it('should render successfully', () => {
    const { baseElement } = render(<LoginForm onSubmit={mockFn} />)
    expect(baseElement).toBeTruthy()
  })
})
