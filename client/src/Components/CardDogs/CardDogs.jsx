// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { getDetail } from '../../Redux/actions/actions';

// const cardDogs = (props) => {
//     const {name, image, weightMin, weightMax, temperament, id } = props;

//     const temp = !temperament ? ['N/A'] : temperament.split(',');  //·Si no hay temperamento le pone 'N/A'(no disponible) y en caso de si tener, devuelve un array de temperamentos separados por ','
//     const dispatch = useDispatch();

//     return (
//         <div>
//             <div>
//                 <div>
//                     <h1>{name}</h1>
//                 </div>
//                 <Link to={`/home/${id}`}>
//                     <img src={image} onClick={() => dispatch(getDetail(id))} /> {/*Se envia el id al reducer para crear la seccion de detail*/}
//                 </Link>
//                 <div>
//                     <p>Peso: Min{weightMin}Kg - Max:{weightMax}Kg</p>
//                 </div>
//                 <div>
//                     {
//                         temp.map((temps, index) => { //·Recorro el array de temperamentos, index es el indice del array
//                             if (index < 6 ) return <p key={index}>{temps}</p>   //·Solo muestra 6 temperamentos
//                         })
//                     }
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default cardDogs;