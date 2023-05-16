const { Router } = require('express');
const { getTemperaments} = require('../Controllers/getTemperaments');

const router = Router();

router.get("/", getTemperaments);


module.exports = router;