import React , {useState , useEffect}from 'react'
import {AppBar , Toolbar , Grid ,Card , CardContent  , CircularProgress, CardMedia , Typography }  from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import mockData from './mockData'

import axios from 'axios'


import {toFirstCharUppercase} from './constants'

const useStyles = makeStyles({
  pokedexContainer :{
      paddingTop : '20px' ,
      paddingLeft : '50px',
      paddingRight : '50px',

  },
  CardMedia :{
      margin : 'auto'
  },
  CardContent : {
      textAlign : 'center'
  }
})



function Pokedex({history}) {
    useEffect(() => {
        axios 
             .get('https://pokeapi.co/api/v2/pokemon?limit=807')
             .then(res => {
               const {data} = res
               const {results} = data
               const newPokemonData = {}
               results.forEach( (pokemon,index) => {
                 newPokemonData[index+1] = {
                     id : index+1,
                     name : pokemon.name,
                     sprite : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                         index+1
                      }.png`,
                 }

                
               })
               setpokemonData(newPokemonData)
             })
      
       },[])

   const classes = useStyles();
   const [pokemonData, setpokemonData] = useState({})

   const getPokemonCard = (pokemonId) => {
       const {id , name ,sprite} = pokemonData[pokemonId] 
     
    return(
     <Grid item xs = {12} sm = {4} key = {pokemonId}> 
         <Card onClick = {() => history.push(`/${pokemonId}`)}>
             <CardMedia
             className  = {classes.CardMedia}
             image = {sprite}
             style = {{height : "130px" , width : "130px" }}
             />
             <CardContent className = {classes.CardContent}>
                 <Typography>
             {`${id}.${toFirstCharUppercase(name)}`}
                 </Typography>
             </CardContent>
         </Card>
     </Grid>
    )  
}
    return (
          <>
          <AppBar position = "static" >
          <Toolbar>
              <div>
                  <SearchIcon/>
              </div>
          </Toolbar>
          </AppBar>
          
          {pokemonData 
          ?  
           ( <Grid   container spacing = {2} className = {classes.pokedexContainer}>
            {  
               
               Object.keys(pokemonData).map(pokemonId => getPokemonCard(pokemonId))
                

              }
            </Grid>)
          :
            <CircularProgress/> 
          }
          </>
    )
}

export default Pokedex
