import { Vitals } from '@/api_interfaces';
import { MONTHS_ABBR, MONTHS_FULL, DAYS_OF_WEEK } from '@/constants';


/* ----- entry functions ----- */
export function convertDateTime(recorded_on:Date, date_style:'fullText'|'fullNumbers'|'abbreviated') {
    // format date
    const year = recorded_on.getFullYear()
    let month, day, day_name, date
    switch (date_style) {
        case 'fullText':
            month = MONTHS_FULL[recorded_on.getMonth()]
            day = recorded_on.getDate()
            day_name = DAYS_OF_WEEK[recorded_on.getDay()]
            date = `${day_name}, ${month} ${day}, ${year}`
            break;
        case 'fullNumbers':
            month = (recorded_on.getMonth() + 1).toString().padStart(2, '0')
            day = recorded_on.getDate().toString().padStart(2, '0')
            date = `${month}/${day}/${year}`
            break;
        case 'abbreviated':
            month = MONTHS_ABBR[recorded_on.getMonth()]
            day = recorded_on.getDate().toString().padStart(2, '0')
            date = `${month} ${day}`
            break;
        default:
            date = ''
            break;
    }
    // format time
    const hours = recorded_on.getHours() % 12 == 0 ? 12 : recorded_on.getHours() % 12
    const minutes = recorded_on.getMinutes().toString().padStart(2, '0')
    const am_pm = recorded_on.getHours() < 12 ? 'am' : 'pm'
    const time = `${hours}:${minutes} ${am_pm}`

    // return [date, time]
    return {date, time}
}

export function isOverdue(due_date:Date) {
    const now = new Date();
    return due_date < now
}

export function formatMeasurement(vitals_type:string, measurement?:number) {
    // units only
    if (measurement === undefined) {
        switch (vitals_type) {
            case 'Weight':
                return `lbs`
            case 'Temperature':
                return `\u00B0F`
            case 'Heart Rate':
                return `bpm`
            case 'Respiratory Rate':
                return `breaths/min`
            default:
                return ''
        }
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

export function getChartProps(vitals_type:string) {
    let min, step;
    switch (vitals_type) {
        case 'Weight':
            min = 0;
            step = undefined;
            break
        case 'Temperature':
            min = 95;
            step = 1;
            break
        case 'Heart Rate':
            min = 50;
            step = 10;
            break
        case 'Respiratory Rate':
            min = 8;
            step = 4;
            break
    }
    return {min, step}
}

export function calculateAverage(data:Vitals[]) {
    // empty array
    if (data.length === 0) {
        return 0
    }

    const sum = data.reduce((accumulator, currData) => accumulator + currData.value, 0);
    const avg = sum / data.length;
    return avg
}

/* ----- pet functions ----- */
export function calculateAge(birthdate:Date) {
    const today = new Date();
    const totalDiffMonths = (today.getFullYear() * 12 + today.getMonth()) - (birthdate.getFullYear() * 12 + birthdate.getMonth());
    const years = Math.floor(totalDiffMonths / 12);
    const months = Math.floor(totalDiffMonths % 12);
    return {years, months}
}
