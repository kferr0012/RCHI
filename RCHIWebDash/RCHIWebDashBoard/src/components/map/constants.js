import { colors } from '../Utilities/colors';
import {routing} from '../Utilities/constants/routing'
export const countyColor = colors[1];

export const backgroundStroke = '#FFF';

export const lat = 33.6906;
export const lng = -116.1055;
export const defaultZoom = 7;

export const subPopLink = routing.host + '/' + routing.root + '/' + routing.formerYear + "/SubpopulationsByCity/";

export const cityNames = {
    'CATHEDRAL CITY': 'Cathedral City',
    'DESERT HOT SPRINGS': 'Desert Hot Springs',
    'INDIAN WELLS': 'Indian Wells',
    'JURUPA VALLEY': 'Jurupa Valley',
    'LA QUINTA': 'La Quinta',
    'LAKE ELSINORE': 'Lake Elsinore',
    'MORENO VALLEY': 'Moreno Valley',
    'PALM DESERT': 'Palm Desert',
    'PALM SPRINGS': 'Palm Springs',
    'RANCHO MIRAGE': 'Rancho Mirage',
    'SAN JACINTO': 'San Jacinto',
};

export const raceCategories = {
    'Asian':0, 
    'American Indian':0, 
    'Black':0, 
    'White':0,
    'Multiple Races':0, 
    'Native Hawaiian':0, 
    'Unknown Race': 0,
}

export const genderCategories = {
    'Male': 0,
    'Female': 0,
    'Transgender': 0,
    'Gender Non-Conforming': 0,
    'Unknown Gender': 0,
}

// export const citynames = [
//     'BANNING',				
//     'BEAUMONT',
//     'BLYTHE',
//     'CALIMESA',
//     'CATHEDRAL CITY',
//     'COACHELLA',
//     'CORONA',
//     'DESERT HOT SPRINGS',
//     'HEMET',
//     'INDIAN WELLS',
//     'INDIO',
//     'JURUPA VALLEY',
//     'LA QUINTA',
//     'LAKE ELSINORE',
//     'MENIFEE',
//     'MORENO VALLEY',
//     'MURRIETA',
//     'NORCO',
//     'PALM DESERT',
//     'PALM SPRINGS',
//     'PERRIS',
//     'RANCHO MIRAGE',
//     'RIVERSIDE',
//     'RIVERSIDE 2',
//     'RIVERSIDE 1',
//     'SAN JACINTO',
//     'TEMECULA',
//     'WILDOMAR',
//     'UNINCORPORATED 1',
//     'UNINCORPORATED 2',
//     'UNINCORPORATED 3',
//     'UNINCORPORATED 4',
//     'UNINCORPORATED 5',
// ];