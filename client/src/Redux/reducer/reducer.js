import {
    GET_ALL_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_NAME,
    GET_DETAIL,
    POST_DOGS,
    FILTER_TEMPERAMENT,
    FILTER_CREATED_DOG,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    CLEAN_DETAIL,
} from '../actions/types';


const initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    dogDetail: [],
    error: false,
};

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        //·Obtener todos los dogs tanto de la api como la base de datos
        case GET_ALL_DOGS:
            return {
                ...state,        //·Copio el estado actual
                dogs: payload,   //·obtengo el array de dogs
                allDogs: payload //·obtengo el array de alldogs
            };
        
        case GET_TEMPERAMENTS:
            return {
                ...state,       
                temperament: payload
            };

        case GET_DOG_NAME:
            return {
                ...state,
                dogs: payload
            };

        case GET_DETAIL:
//·Caso de obtener la descripcion de cada raza seleccionada
            return {
                ...state,
                dogDetail: payload  //·Obtengo el perro seleccionado
            };

        case FILTER_TEMPERAMENT:
            let filteredTemp = payload === "all" 
            ? state.allDogs 
            : state.allDogs.filter(dog => {
                if(!dog.temperament) return undefined;  //·Si el perro no tiene temperamento, no lo muestro y devuelvo Undef.   
                return dog.temperament.includes(payload) //·Si el perro tiene temperamento y el temperamento es igual al que selecciono lo muestro
            });
            return {
                ...state,
                dogsFilter: filteredTemp
            };

        case FILTER_CREATED_DOG: 
            let allDogs = state.allDogs;
            let filteredCreated = payload === "created" 
            ? allDogs.filter(d => d.createdInDb)  //·Obtengo un nuevo array que solo contiene los perros con prop "createdInDb" verdadera.
            : allDogs.filter(d => !d.createdInDb)  //·En es caso en para los perros con la prop "createdInDb" falsa.
            
            return {
                ...state,
                dogs: payload === "all" ? state.allDogs : filteredCreated
            };

        case ORDER_BY_NAME:
            let orderName = payload === "A-Z" ? state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;       // si el nombre de a es mayor que el de b, a va despues que b
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;     // si el nombre de a es menor que el de b, a va antes que b
                return 0;
            })
            : state.dogs.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;     
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            })

            return {
                ...state,
                dogs: orderName
            };

        case ORDER_BY_WEIGHT:
            let allDogsWeight = state.allDogs.filter(dog => dog.weightMin);     //·Filtra perros con peso mínimo definido.
            let filteredWeight = payload === "weightMin"                        //·Si el payload en ...Min -> ordenar los elementos de un arreglo(sort)
            ? allDogsWeight.sort((a, b) => {                                    
                return a.weightMin - b.weightMin
            })
            : allDogsWeight.sort((a, b) => {               //·Misma fn, pero se invierte el resultado utilizando el método reverse().
                return a.weightMin - b.weightMin
            }).reverse()
            
            return {
                ...state,
                dogs: filteredWeight
            }

        case POST_DOGS:
            return {
                ...state
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                dogDetail: {}       //·Esto limpia los detalles del perro al asignar un objeto vacío.
            }
        
        default:
            return state;
    }
};

export default reducer