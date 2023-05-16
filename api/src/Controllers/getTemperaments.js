require('dotenv').config();
const { API_URL, API_KEY } = process.env;
const { Temperament } = require('../db');
const axios = require('axios');

const urlApiDog = `${API_URL}?api_key=${API_KEY}`;

const getTemperaments = async (req, res) => {
    try {
        const tempApi = await axios.get(urlApiDog);
        const tempDb = tempApi.data
            .map((temp) => temp.temperament)
            .toString()                             //·Lo convierto a string.
            .split(',')                             //·Separo con comas.
            .map((t) => t.trim())                   //·Quito los espacios de los extremos.
            .filter((t) => t.length > 1)            //·Quito las palabras que tienen una longitud de 1.
        const filter = tempDb.filter((t) => t);     //·Por cada temperamento lo guardo separado.
        let tempFilt = [...new Set(filter)];        // hago un nuevo array con los temperamentos que tenia guardados y los nuevos, si se repiten se quitan
        
        tempFilt.forEach((temp) => {                //forEach() ejecuta la función indicada una vez por cada elemento del array
            Temperament.findOrCreate({              //Se fija si esta el temperamento, si esta no hace nada y caso contrario lo crea.
                where: { name: temp}    
            })
        });
        const allTemperaments = await Temperament.findAll();    //·Trae todos los temperamentos de la bd.
        res.status(200).json(allTemperaments);

    } catch (error) {
        res.status(404).send({error: 'There are not temperaments'});
    }
};

// const postTemperament = async (req, res) => {
//     const { temperament } = req.params;
//     try{
//     //const newTemperament = req.params.temperament;
//     const postedTemp = await Temperament.create({
//        name: temperament,
//     });
//     return res.status(200).json(postedTemp)
//     } catch (error) {
//         res.status(404).send(error)
//     }
// };

module.exports = { 
                   getTemperaments,
                   //postTemperament
                 };