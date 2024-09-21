import dayjs from 'dayjs'

// eslint-disable-next-line prefer-regex-literals
const timeRegExp = new RegExp('^(\\d+d)?(\\d+h)?(\\d+m)?$', 'i')

/**
 * 解析时间
 * @param time example: 1d23h50m
 */
export function parseTime(time: string) {
  const matches = timeRegExp.exec(time)
  if (matches) {
    return {
      day: Number.parseInt(matches[1]) || 0,
      hour: Number.parseInt(matches[2]) || 0,
      minute: Number.parseInt(matches[3]) || 0,
    }
  }
  else {
    return null
  }
}

/**
 * 检查时间是否超过限额（不得超过一年）
 * @param time
 */
export function checkTime(time: Date) {
  const maxTime = dayjs().add(1, 'year')
  return time.valueOf() < maxTime.valueOf()
}
