import { render } from '@testing-library/react'

import RegisterForm from './register-form'

describe('RegisterForm', () => {
  const mockFn = vi.fn()

  it('should render successfully', () => {
    const { baseElement } = render(<RegisterForm onSubmit={mockFn} />)
    expect(baseElement).toBeTruthy()
  })
})
