import React , {useState}from 'react'
import {AppBar , Toolbar , Grid ,Card , CardContent  , CircularProgress, CardMedia , Typography }  from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import mockData from './mockData'


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

const toFirstCharUppercase = name =>
name.charAt(0).toUpperCase() + name.slice(1)

function Pokedex({history}) {
   const classes = useStyles();
   const [pokemonData, setpokemonData] = useState(mockData)

   const getPokemonCard = (pokemonId) => {
       const {id , name} = pokemonData[`${pokemonId}`] 
       const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
     
    return(
     <Grid item xs = {12} sm = {4} key = {pokemonId}> 
         <Card onClick = {() => history.push(`\ ${pokemonId}`)}>
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
          <Toolbar/>
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
