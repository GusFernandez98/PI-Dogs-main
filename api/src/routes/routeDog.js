const { Router } = require('express');
const { getDogs, getDogsById, postDogs, deleteDogs } = require('../Controllers/DogController');

const router = Router();

//Rutas:
router.get('/', getDogs);
router.get('/:id', getDogsById);
router.post('/', postDogs);
router.delete('/deleted/:id', deleteDogs);

module.exports = router;