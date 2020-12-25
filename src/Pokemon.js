import React from 'react'

function Pokemon(props) {
    
 
    return (
        <div>
            {console.log(props.match.params.pokemonId)}
            <h1>{`Pokemon!!! 
             ${props.match.params.pokemonId}`
            }</h1>
        </div>
    )
}

export default Pokemon
