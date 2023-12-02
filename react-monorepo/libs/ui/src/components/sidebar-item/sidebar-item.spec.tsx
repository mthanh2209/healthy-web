import { render } from '@testing-library/react'
import { FaBeer } from 'react-icons/fa'

import SidebarItem from './sidebar-item'

describe('SidebarItem', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SidebarItem to="#" title="item" icon={FaBeer} />)
    expect(baseElement).toBeTruthy()
  })
})
