import { Typography } from '@material-ui/core'
import React , {useState} from 'react'
import mockData from './mockData'
import {toFirstCharUppercase} from './constants'
import { Link } from 'react-router-dom'


function Pokemon(props) {
    const  {match} = props
    const  {params} = match
    const  {pokemonId} = params
    const [pokemon , setpokemon ] = useState(mockData[`${pokemonId}`])

    const generatePokemonJSX = () => {
               
       const  { id,name,species , types , height , weight , sprites} = pokemon;
       const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
       const {front_default} = sprites;
       return (
         <>  
        <Typography variant = "h1">
        {`${id}.${toFirstCharUppercase(name)}`}
         <img src = {front_default} />
       </Typography>
       <img style = {{height : '300px' , width : '300px'}} src = {fullImageUrl} />
       <Typography variant = "h3">Pokemon Info</Typography>
       <Typography>
           {"Species: "} 
           <Link href ={species.url}>{species.name}</Link>
       </Typography>
      <Typography>
          Height : {height}
      </Typography>
      <Typography>
          Weight : {weight}
      </Typography>
      <Typography variant = "h6">
        Types:
      </Typography>
      {
          types.map( (typeInfo) =>{
                const {type} = typeInfo;
                const {name} = type;

                return <Typography key = {name}> {`${name}`}</Typography>
          })
      }

       </>
       )

    }
 
    return (
        <>
        {generatePokemonJSX()}
        </>
    )
}

export default Pokemon
