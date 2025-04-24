import { THEME } from '@/theme';
import { Kind } from '@/api_interfaces';


export const FAKE_ID = Number.NEGATIVE_INFINITY;

// entry constants
export const MONTHS_ABBR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
export const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const KINDS : {[key:number] : Kind}  = {
    1 : {id: 1, name: 'Other', category: 'Other'},
    2 : {id: 2, name: 'Meal', category: 'Food and Water'},
    3 : {id: 3, name: 'Water', category: 'Food and Water'},
    4 : {id: 4, name: 'Treat', category: 'Food and Water'},
    5 : {id: 5, name: 'Groom', category: 'Care'},
    6 : {id: 6, name: 'Brush Teeth', category: 'Care'},
    7 : {id: 7, name: 'Clip Nails', category: 'Care'},
    8 : {id: 8, name: 'Walk', category: 'Activity'},
    9 : {id: 9, name: 'Train', category: 'Activity'},
    10 : {id: 10, name: 'Play', category: 'Activity'},
    11 : {id: 11, name: 'Pee', category: 'Activity'},
    12 : {id: 12, name: 'Poop', category: 'Activity'},
    13 : {id: 13, name: 'Weight', category: 'Health'},
    14 : {id: 14, name: 'Temperature', category: 'Health'},
    15 : {id: 15, name: 'Heart Rate', category: 'Health'},
    16 : {id: 16, name: 'Respiratory Rate', category: 'Health'},
    17 : {id: 17, name: 'Medicine', category: 'Health'},
    18 : {id: 18, name: 'Vet Appointment', category: 'Health'},
};
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