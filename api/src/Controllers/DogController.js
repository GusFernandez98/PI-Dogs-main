const { response } = require('express');
const { Dog, Temperament } = require('../db');
const { getAllInfo } = require('./getAllInfo')

//Controlador para ruta get
const getDogs = async (req, res) => {
    const { name } = req.query;
    const allDogs = await getAllInfo();
    try {
        if (name) {
            const dogSelect = allDogs.filter((dog) => dog.name.toLowerCase().includes(name.toLowerCase()));
            dogSelect.length 
            ? res.status(200).send(dogSelect)
            : res.status(404).send({error: 'dog not found'});
        }
        else {
            res.status(201).json(allDogs);
        }
    } catch (error) {
        res.status(404).send({error: 'Dog not foud'})
    }
};

//Controlador para ruta get por id
const getDogsById = async (req, res) => {
     const { id } = req.params
     const allDogs = await getAllInfo();
     try {
         const dogSelect = allDogs.filter((dog) => dog.id === Number(id));
         if(dogSelect.length) res.status(200).send(dogSelect);
    } catch (error) {
         res.status(404).send({error: 'Dog not found'})
     }
};

//Controlador para ruta post 
const postDogs = async (req, res) => {// lo que requiere el body
  const { name, heightMax, heightMin, weightMax, weightMin, life_spanMax, life_spanMin, image, temperament } = req.body;
  let temperamentId = await Temperament.findOne({ // se fija si el temperamento esta en la bd
      where: { name: temperament }
  });
  let dogName = await getAllInfo().then((d) => d.find((d) => d.name === name)); // se fija si el nombre esta en la api
  // Creo el Dog

      if(!name || !heightMax || !heightMin || !weightMax || !weightMin || !temperament){
          res.status(400).send("missing data"); // 400 porque faltan datos
      } else if (dogName){                      // si el nombre esta en la api
          res.status(404).send("The dog's name already exists"); // 404 porque el nombre ya existe
      } else if (heightMax < heightMin || weightMax < weightMin || life_spanMax < life_spanMin){
          res.status(400).send("The minimum data cannot be greater than the maximum data"); // 400 porque los datos son invalidos
      } else if (heightMax > 200 || heightMin < 0 || weightMax > 100 || weightMin < 0 || life_spanMax > 30 || life_spanMin < 0){
          res.status(400).send("invalid data"); // 400 porque los datos son invalidos
      } else if (temperamentId === null){
          res.status(400).send("invalid temperament"); // 400 porque el temperamento es invalido
      } else {
        const newDog = await Dog.create({ 
              name: name,
              heightMin: parseInt(heightMin),
              heightMax: parseInt(heightMax),
              weightMin: parseInt(weightMin),
              weightMax: parseInt(weightMax),
              life_spanMax: parseInt(life_spanMax),
              life_spanMin: parseInt(life_spanMin),
              createdInBd: true,
              image: image //|| "https://www.dogbreedslist.info/uploads/dog-pictures/beagle-2.jpg",
          })
          .then(async (dog) => {
              // Guardo el temperamento
              const temp = await Temperament.findAll({  
                  where: { name: temperament },         // where para que solo se guarde el temperamento que se le pasa
              });
              // Guardo el Dog en el temperamento
              await dog.addTemperament(temp);       //addTemperament es una funcion de sequelize que guarda el temperamento en el dog

              res.status(201).json(dog);      // 201 porque se creo
          }).catch(err => err)

           res.status(201).json({               
              // name,
              // heightMin,
              // heightMax,
              // weightMin,
              // weightMax,
              // life_spanMax,
              // life_spanMin,
              // image
              newDog
           });
      }
};

//Controlador para delete
const deleteDogs = async (req, res) => {
    const { id } = req.params;
    const dog = await Dog.findByPk(id);
    if (!dog) {
        res.status(404).send('Dog not found')
    }
    else{
        await Dog.destroy();
        res.status(200).send('Dog eliminated')
    }
};

module.exports = { 
    getDogs,
    getDogsById,
    postDogs,
    deleteDogs
}