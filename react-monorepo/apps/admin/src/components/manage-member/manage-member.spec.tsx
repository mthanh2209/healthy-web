import { render } from '@testing-library/react'

import ManageMember from './manage-member'

describe('ManageMember', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ManageMember />)
    expect(baseElement).toBeTruthy()
  })
})
