import React from 'react';
import {Link} from 'react-router-dom';
import s from '../Style/landingpage.module.css'


export default function LandingPage () {
    return (
        <div className={s.main}>
            
        
        <div className={s.rec} >
            <h1>Welcome to the Dog's App</h1>
            
            <Link to = '/home'>
                
                <button className={s.boton}> go Home </button>
                
            </Link> 
        </div>
        </div>
    )
}