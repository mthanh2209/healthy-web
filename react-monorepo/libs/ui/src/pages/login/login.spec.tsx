import { render } from '@testing-library/react'

import Login from './login'

describe('LoginPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Login />)
    expect(baseElement).toBeTruthy()
  })
})
