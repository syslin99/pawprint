import { MONTHS_ABBR } from '@/constants';

// entry functions
export function convertDateTime(recorded_on:string) {
    const datetime = new Date(recorded_on)
    const month = MONTHS_ABBR[datetime.getMonth()]
    const day = datetime.getDate().toString().padStart(2, '0')
    const year = datetime.getFullYear()
    const date = `${month} ${day}, ${year}`
    const hours = datetime.getHours() % 12 == 0 ? 12 : datetime.getHours() % 12
    const minutes = datetime.getMinutes().toString().padStart(2, '0')
    const am_pm = datetime.getHours() < 12 ? 'am' : 'pm'
    const time = `${hours}:${minutes} ${am_pm}`
    return [date, time]
}

export function formatMeasurement(vitals_type:string, measurement:number|undefined) {
    // not a vitals measurement
    if (measurement === undefined) {
        return ''
    }

    switch (vitals_type) {
        case 'Weight':
            return `${measurement.toFixed(1)} lbs`
        case 'Temperature':
            return `${measurement.toFixed(1)} \u00B0F`
        case 'Heart Rate':
            return `${measurement.toFixed(0)} bpm`
        case 'Respiratory Rate':
            return `${measurement.toFixed(0)} breaths/min`
        default:
            return ''
    }
}

// pet functions
export function calculateAge(birthdate:string) {
    const target = new Date(birthdate)
    const today = new Date();
    const totalDiffMonths = (today.getFullYear() * 12 + today.getMonth()) - (target.getFullYear() * 12 + target.getMonth());
    const years = Math.floor(totalDiffMonths / 12);
    const months = Math.floor(totalDiffMonths % 12);
    return {years, months}
}
