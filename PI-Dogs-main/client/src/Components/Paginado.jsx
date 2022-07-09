import React from "react";
import '../Style/paginado.css'
export default function Paginado ({DogsPerPage, allDogs, paginado }) {

    const pageNumbers =[];

    for (let i=1; i<=Math.ceil(allDogs/DogsPerPage); i++ ){
        pageNumbers.push(i)
    }
    
    return(
        <div >
            
            <ul >
                { 
                    pageNumbers && pageNumbers.map(number=> {
                        return(
                        <li key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                        )
                    })
                    
                }
            </ul>

        </div>
    )
};