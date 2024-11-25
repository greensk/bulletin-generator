import { format, parse } from 'date-fns'
export const genRandomString = function (length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export const beautifyDate = function (originalDate: string): string {
  const theDate = parse(originalDate, 'yyyy-MM-dd', new Date)
  return format(theDate, 'dd.MM.yyyy')
}
