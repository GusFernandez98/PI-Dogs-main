const { getInfoApi } = require('./getInfoApi');
const { getInfoDb } = require('./getInfoDb');

//funcion que concatena los datos de la api y los de la bd:
const getAllInfo = async () => {
    const apiInfo = await getInfoApi();         //·Trae info de la api.
    const dbInfo = await getInfoDb();           //·Trae info de la bd.
    const allInfo = apiInfo.concat(dbInfo);     //·Concatena la info de la api y la de la bd.
    return allInfo;
};

module.exports = { getAllInfo };