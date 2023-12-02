import dayjs from 'dayjs'

export const isOverDue = (borrow_date: string): boolean => {
  const currentDate = dayjs()
  const dateRemaining = currentDate.diff(borrow_date, 'd')

  if (dateRemaining >= 10) return true

  return false
}
