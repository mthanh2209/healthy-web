import { render } from '@testing-library/react'

import Search from './search'

describe('Search', () => {
  const searchValue = 'search'
  const setSearchValue = vi.fn()

  it('should render successfully', () => {
    const { baseElement } = render(<Search value={searchValue} onChange={setSearchValue} />)
    expect(baseElement).toBeTruthy()
  })
})
