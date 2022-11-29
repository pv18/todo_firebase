import dayjs from 'dayjs';

export const verifyRunDateTodo = (date: string) => {
    const year = +dayjs(date).format('YYYY')
    const month = +dayjs(date).format('MM')
    const day = +dayjs(date).format('DD')
    const yearNow = dayjs().year()
    const monthNow = dayjs().month() + 1
    const dayNow = dayjs().date()
    if (yearNow > year) return true
    if (yearNow === year && monthNow > month) return true
    if (yearNow === year && monthNow === month && dayNow >= day) return true

    return false
}