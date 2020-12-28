import { CircularProgress, Typography,Button } from '@material-ui/core'
import React , {useState,useEffect} from 'react'
import {toFirstCharUppercase} from './constants'
import { Link } from 'react-router-dom'
import axios from 'axios'



function Pokemon(props) {
    const  {match , history} = props
    const  {params} = match
    const  {pokemonId} = params
    const [pokemon , setpokemon ] = useState(undefined)

    useEffect(() => {
        axios
             .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
             .then(res => {
                 const {data} = res;
                 setpokemon(data);
             })
             .catch(err => {
                 setpokemon(false);
             })
    }, [pokemonId])

    //1.pokemon undefined , we are getting data
    //->return pokemon data
    //2.pokemon = good data , that means we've gotten info 
    //->return actual info
    //3. pokemon = bad/data , false 
    //return pokemon not found

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
        {pokemon === undefined && <CircularProgress/>}
        {pokemon !== undefined && pokemon && generatePokemonJSX()}
        {pokemon == false && <Typography>Pokemon not found</Typography>}
        
        <Button variant = "contained" onClick = {() => history.push(`/`)} >
            Back to Pokedex
        </Button>
      
        </>
    )
}

export default Pokemon
