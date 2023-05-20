import {
    GET_ALL_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_NAME,
    GET_DETAIL,
    //POST_DOGS,
    FILTER_TEMPERAMENT,
    FILTER_CREATED_DOG,
    ORDER_BY_NAME,
    ORDER_BY_WEIGHT,
    CLEAN_DETAIL,
} from '../actions/types';
import axios from 'axios';

//Actions para obtener datos del backend -> puerto 3001         ||manda un Obj, con la prop obligatoria type: "action type" y paylod: data -> guarda la info para el reducer.
export const getAllDogs = () => {
    //Obtengo los perros en /dogs por medio del get
    return async (dispatch) => {
        try {
            const response = await axios.get('/dogs');  //·Espera que el axios traiga todos los perros, una vez que los tenga realiza el dispatch.
            return dispatch({
                type: GET_ALL_DOGS,
                payload: response.data
            });
        } catch (error) {
            console.log(error)
        }
    }
};

export const getTemperamets = () => {
    //Obtengo los temperamentos en /temperaments por medio del get
    return async (dispatch) => {
        const response = await axios.get('/temperaments');  //·Trae todos los temperamentos
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: response.data
        })
    }
};

export const getDogName = (name) => {
    //·Obtengo todos los perros que su nombre coincidan con el parametro
    return async (dispatch) => {
        try {
            const response = await axios.get(`/dogs?name=${name}`)  //el nombre se obtiene por query.
            return dispatch({
                type: GET_DOG_NAME,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`/dogs/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export const postDogs = (data) => {
    return async () => {
        try {
            const response = await axios.post('/dogs', data)
            return response
        } catch (error) {
            console.log(error)
        }
    }
};

//Filters
export const filterTemperament = (temperament) => {
    return {
        type: FILTER_TEMPERAMENT,
        payload: temperament
    }
}; 

export const filterCreatedDog = (payload) => {
    return {
        type: FILTER_CREATED_DOG,
        payload
    }
};

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}; 

export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
};

//Utils
export const cleanDetail = (payload) => {
    return {
        type: CLEAN_DETAIL,
        payload
    }
};