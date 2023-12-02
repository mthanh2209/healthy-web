import { memo, useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

export interface ConfirmDialogProps {
  header: string
  body: string
  cancelTitle?: string
  confirmTitle?: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmDialog = memo(({ isOpen, onClose, onConfirm, header, body, cancelTitle = 'cancel', confirmTitle = 'confirm' }: ConfirmDialogProps) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {cancelTitle}
            </Button>
            <Button colorScheme="red" onClick={onConfirm} ml={3}>
              {confirmTitle}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
})

export default ConfirmDialog
