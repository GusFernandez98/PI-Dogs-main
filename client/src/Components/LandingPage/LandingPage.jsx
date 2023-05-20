import React from "react";
import {NavLink} from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css';


function LandingPage () {
    return (
        <div className={styles.inicio}> 

            <h1 className={styles.titulo}>PI DOGS</h1>
                
            <NavLink to='/home'>
                <button className={styles.bt}>ENTER</button>
            </NavLink>
           
        </div>
    )
}
export default LandingPage;