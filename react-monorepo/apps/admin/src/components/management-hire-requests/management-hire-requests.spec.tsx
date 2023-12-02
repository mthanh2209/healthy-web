import { render } from '@testing-library/react'

import ManagementHireRequests from './management-hire-requests'

describe('ManagementHireRequests', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManagementHireRequests />)
    expect(baseElement).toBeTruthy()
  })
})
