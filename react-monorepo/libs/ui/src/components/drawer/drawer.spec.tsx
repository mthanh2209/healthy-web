import { render } from '@testing-library/react'
import { FiHome } from 'react-icons/fi'

import Drawer from './drawer'
import Sidebar from '../sidebar/sidebar'

describe('Drawer', () => {
  const mockFn = vi.fn()
  const data = [{ name: 'Home', icon: FiHome, href: '#' }]
  const renderContent = () => <Sidebar items={data} onClose={mockFn} />

  it('should render successfully', () => {
    const { baseElement } = render(
      <Drawer isOpen onClose={mockFn}>
        {renderContent()}
      </Drawer>
    )
    expect(baseElement).toBeTruthy()
  })
})
