const {Dog, Temperament } = require('../db');

//Funcion para traer info de la db:
const getInfoDb = async () => {
    try {
        const dogs = await Dog.findAll({                            //·Trae todos los perros de la bd.
            include: {
                model: Temperament,
                atributes: ['name'],
                through: {
                    attributes: [],
                }
            }                                    //·Trae los temperamentos de la bd. 
        });

        const infoDb = dogs.map((dog) => {                                            //·Mapea los datos de la bd.
            let temperamentos = dog.temperament.map(temp => temp.name);               //·Trae los temperamentos de la bd.
            let aux = temperamentos.join(',');                                        //·Convierte el array de temperamentos en string.

            return{
                id: dog.id,
                name: dog.name,
                heightMin: parseInt(dog.heightMin),
                heightMax: parseInt(dog.heightMax),
                weightMin: parseInt(dog.weightMin),
                weightMax: parseInt(dog.weightMax),
                life_spanMin: parseInt(dog.life_spanMin) ,
                life_spanMax: parseInt(dog.life_spanMax),
                temperament: aux,
                createInBd: true,
                image: dog.image
            }
        });
        return infoDb;
    } catch (error) {
        console.log(error)
    }
};

module.exports = { getInfoDb };