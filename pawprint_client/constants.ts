import { THEME } from '@/theme';


export const FAKE_ID = Number.NEGATIVE_INFINITY;

// entry constants
export const MONTHS_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const KIND_ICONS : {[key:string] : string}  = {
    'Meal': 'utensils',
    'Water': 'tint',
    'Treat': 'bone',
    'Groom': 'bath',
    'Brush Teeth': 'tooth',
    'Clip Nails': 'cut',
    'Walk': 'walking',
    'Train': 'dog',
    'Play': 'baseball-ball',
    'Pee': 'toilet',
    'Poop': 'poop',
    'Weight': 'weight',
    'Temperature': 'thermometer-three-quarters',
    'Heart Rate': 'heartbeat',
    'Respiratory Rate': 'lungs',
    'Medicine': 'pills',
    'Vet Appointment': 'stethoscope',
    'Other': 'paw',
};
export const KIND_COLORS : {[key:string]: string} = {
    'Food and Water': THEME.COLOR_FOOD_WATER,
    'Care': THEME.COLOR_CARE,
    'Activity': THEME.COLOR_ACTIVITY,
    'Health': THEME.COLOR_HEALTH,
    'Other': THEME.COLOR_OTHER,
};