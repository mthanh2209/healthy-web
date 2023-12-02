import { render } from '@testing-library/react'

import ManagementTable from './management-table'
import { IUser } from '@react-monorepo/types'
import { Column, createColumnHelper } from '@tanstack/react-table'

describe('ManagementTable', () => {
  const columnHelper = createColumnHelper<IUser>()
  const columns = [
    columnHelper.accessor('id', {
      cell: (info) => info.getValue(),
      header: 'Id',
    }),
  ] as Column<IUser>[]
  const data: IUser[] = [
    {
      id: 1,
      firstName: 'Hez',
      lastName: 'Ken',
      email: 'admin@gmail.com',
      password: '12345678',
      phone: '0123456789',
      hireRequests: 1,
      role: 'admin',
    },
  ]

  it('should render successfully', () => {
    const { baseElement } = render(<ManagementTable data={data} columns={columns} />)
    expect(baseElement).toBeTruthy()
  })
})
