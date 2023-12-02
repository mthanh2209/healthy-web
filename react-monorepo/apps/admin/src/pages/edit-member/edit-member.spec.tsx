import { render } from '@testing-library/react'

import EditMember from './edit-member-page'

describe('EditMemberPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditMember />)
    expect(baseElement).toBeTruthy()
  })
})
