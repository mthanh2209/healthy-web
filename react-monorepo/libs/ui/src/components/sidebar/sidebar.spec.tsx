import { render } from '@testing-library/react'
import { FiHome } from 'react-icons/fi'

import Sidebar from './sidebar'

describe('Sidebar', () => {
  const mockFn = vi.fn()
  const data = [{ name: 'Home', icon: FiHome, href: '#' }]

  it('should render successfully', () => {
    const { baseElement } = render(<Sidebar onClose={mockFn} items={data} />)
    expect(baseElement).toBeTruthy()
  })
})
