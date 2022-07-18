import React from "react";

import s from '../Style/paginado.module.css'

export default function Paginado ({DogsPerPage, allDogs, paginado,currentPage }) {

    const pageNumbers =[];

    for (let i=1; i<=Math.ceil(allDogs/DogsPerPage); i++ ){
        pageNumbers.push(i)
    }
    
    return(
        <nav className={s.nav}>
        <ul className={s.paginated}>
            {pageNumbers &&
            pageNumbers.map(number=> (
           <li className={s.number} key={number}>
                 <p className= {currentPage === number? s.current : s.img} onClick={() => paginado(number)}>{number}</p>
             </li>
            ))}
        </ul>
    </nav>
    )
};