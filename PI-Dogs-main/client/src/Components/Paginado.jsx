import React from "react";

import s from '../Style/paginado.module.css'

export default function Paginado ({DogsPerPage, allDogs, paginado, currentPage,changePageNext, changePagePrev }) {

    const pageNumbers =[];

    for (let i=1; i<=Math.ceil(allDogs/DogsPerPage); i++ ){
        pageNumbers.push(i)
    }
   
    
    return(
        
        <nav className={s.nav}>
            
        <li className={s.paginated}>
            {pageNumbers.length>=2&&currentPage!==1?<p onClick={changePagePrev} className={s.change}>prev</p>:null}
            {pageNumbers &&
            pageNumbers.map(number=> (
           <li className={s.number} key={number}>
    
                 <p className= {currentPage === number? s.current : s.img} onClick={() => paginado(number)}>{number}</p>
             </li>
            ))}
            {pageNumbers.length>1&&currentPage!==pageNumbers.length?<p onClick={changePageNext} className={s.change}>next</p>:null}
            
        </li>
    </nav>
    )
};