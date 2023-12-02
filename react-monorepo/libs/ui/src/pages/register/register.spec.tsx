import { render } from '@testing-library/react'

import Register from './register'

describe('RegisterPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Register />)
    expect(baseElement).toBeTruthy()
  })
})
