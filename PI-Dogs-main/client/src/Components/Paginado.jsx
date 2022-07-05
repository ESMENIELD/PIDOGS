import React from "react";

export default function Paginado ({DogsPerPage, allDogs, paginado }) {

    const pageNumbers =[];

    for (let i=1; i<=Math.ceil(allDogs/DogsPerPage); i++ ){
        pageNumbers.push(i)
    }
    
    return(
        <nav>
            {console.log(pageNumbers)}
            <ul className="paginado">
                { 
                    pageNumbers && pageNumbers.map(number=> {
                        return(
                        <li className="number" key={number}>
                        <button onClick={() => paginado(number)}>{number}</button>
                        </li>
                        )
                    })
                    
                }
            </ul>

        </nav>
    )
};