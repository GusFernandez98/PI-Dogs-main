require ('dotenv').config();
const { API_URL, API_KEY } = process.env;
const axios = require('axios');
const urlApiDog = `${API_URL}?api_key=${API_KEY}`; //-> `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

//Funcion para traer toda la info de la api:
const getInfoApi = async () => {
    const dogsUrl = await axios.get(urlApiDog);    //·Trae la info de la api.

    const dogsInfo = await dogsUrl.data.map((dog) => {
        let weightMin = parseInt(dog.weight.metric.slice(0, 2).trim());   
        let weightMax = parseInt(dog.weight.metric.slice(4).trim());
        const heightMin = parseInt(dog.height.metric.slice(0, 2).trim());
        const heightMax = parseInt(dog.height.metric.slice(4).trim());
        const life_spanMin = parseInt(dog.life_span.slice(0, 2).trim());
        const life_spanMax = parseInt(dog.life_span.slice(4).trim()); 
//·Parsea(convierte) de string a number -> del objeto weight, la propiedad metric.
//·Slice -> devuelve una copia de una parte del array dentro de un nuevo array, con los elementos indicados.
//Trim -> borra espacios en blancos de los extremos delstring. " hola " -> dejandolo asi -> "hola".
        return{
            id: dog.id,
            name: dog.name,
            // breed_group: dog.breed_group,
            life_spanMin: life_spanMin,
            life_spanMax: life_spanMax,
            heightMin: heightMin,
            heightMax: heightMax,
            weightMin: weightMin,
            weightMax: weightMax,
            temperament: dog.temperament,
            createdInBd: false,
            image: dog.image.url,
        }
    });
    return dogsInfo;
};

module.exports = { getInfoApi };