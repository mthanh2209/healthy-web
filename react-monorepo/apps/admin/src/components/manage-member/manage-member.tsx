import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { Column, createColumnHelper } from '@tanstack/react-table'
import { shallow } from 'zustand/shallow'
import { Badge, HStack, IconButton, UseToastOptions, useDisclosure, useToast } from '@chakra-ui/react'

import { useUserStore } from '@react-monorepo/stores'
import { IUser } from '@react-monorepo/types'
import { MESSAGES_ERRORS, MESSAGES_SUCCESS } from '@react-monorepo/utils'
import { useDeleteMember, useGetUsers } from '@react-monorepo/hooks'

const ConfirmDialog = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.ConfirmDialog })))
const ManagementTable = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.ManagementTable })))
const Loading = lazy(() => import('@react-monorepo/ui').then((module) => ({ default: module.Loading })))

const USERS_ENDPOINT = import.meta.env.VITE_USERS_ENDPOINT

const ManageMember = memo(() => {
  const { users } = useUserStore((state) => ({ users: state.users }), shallow)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [selectedMemberId, setSelectedMemberId] = useState<number>()
  const memberList: IUser[] = useMemo(() => users.filter((item) => item.role !== 'admin'), [users])
  const { data, isLoading } = useGetUsers()

  useEffect(() => {
    if (!data) return
    useUserStore.setState({ users: data })
  }, [data])

  const handleClickDeleteBtn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onOpen()
      const memberId: string | null = event.currentTarget.getAttribute('data-id')

      if (!memberId) return
      setSelectedMemberId(+memberId)
    },
    [onOpen]
  )

  const handleClickEditBtn = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      onOpen()
      const memberId: string | null = event.currentTarget.getAttribute('data-id')

      navigate(`/admin/edit-member/${memberId}`)
    },
    [onOpen, navigate]
  )

  const columnTemplate = useMemo(() => {
    const columnHelper = createColumnHelper<IUser>()
    return [
      columnHelper.accessor('id', {
        cell: (info) => info.getValue(),
        header: 'Id',
      }),
      columnHelper.accessor('firstName', {
        cell: (info) => info.getValue(),
        header: 'First name',
      }),
      columnHelper.accessor('lastName', {
        cell: (info) => info.getValue(),
        header: 'Last name',
      }),
      columnHelper.accessor('email', {
        cell: (info) => info.getValue(),
        header: 'Email',
      }),
      columnHelper.accessor('phone', {
        cell: (info) => info.getValue(),
        header: 'Phone',
      }),
      columnHelper.accessor('role', {
        cell: (info) => (
          <Badge px={4} py={1} borderRadius="2xl" bgColor="green.100" color="green" textTransform="capitalize">
            {info.getValue()}
          </Badge>
        ),
        header: 'Role',
      }),
      columnHelper.display({
        id: 'actions',
        cell: (info) => (
          <HStack>
            <IconButton
              data-id={info.row.getValue('id')}
              onClick={handleClickEditBtn}
              icon={<FiEdit2 />}
              aria-label="edit button"
              variant="ghost"
              _hover={{
                bgColor: 'blue.100',
                color: 'blue',
              }}
            />
            <IconButton
              data-id={info.row.getValue('id')}
              onClick={handleClickDeleteBtn}
              icon={<FiTrash2 />}
              aria-label="delete button"
              variant="ghost"
              _hover={{
                bgColor: 'red.100',
                color: 'red',
              }}
            />
          </HStack>
        ),
      }),
    ] as Column<IUser>[]
  }, [handleClickEditBtn, handleClickDeleteBtn])

  const toast = useToast()
  const renderToast = useCallback(
    (title: string, description: string, status: UseToastOptions['status']) => {
      toast({
        title: title,
        description: description,
        status,
      })
    },
    [toast]
  )
  const { mutate, error, isSuccess } = useDeleteMember()

  useEffect(() => {
    if (isSuccess) renderToast(MESSAGES_SUCCESS.DELETE.TITLE, MESSAGES_SUCCESS.DELETE.DESC, 'success')

    if (error instanceof Error) renderToast(error.message, MESSAGES_ERRORS.RE_CHECK_INFO, 'error')
  }, [error, isSuccess, renderToast])

  const handleDeleteMember = useCallback(() => {
    if (!selectedMemberId) return
    onClose()
    mutate({
      path: USERS_ENDPOINT,
      id: selectedMemberId,
    })
  }, [mutate, onClose, selectedMemberId])

  return (
    <>
      <ManagementTable data={memberList} columns={columnTemplate} />
      {isOpen && (
        <ConfirmDialog
          isOpen={isOpen}
          onClose={onClose}
          onConfirm={handleDeleteMember}
          confirmTitle="delete"
          header="Delete row"
          body="Are you sure? You can't undo this action afterwards."
        />
      )}
      {isLoading && <Loading />}
    </>
  )
})

export default ManageMember
