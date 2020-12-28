import React from 'react'
import Pokedex from './Pokedex'
import {Route , Switch} from 'react-router-dom'
import Pokemon from './Pokemon';


function App() {
  return (
    <div className="App">
     <Switch>
       <Route exact
      path = "/" 
      render = {(props) => <Pokedex   {...props} />
       }/> 
      <Route exact
      path = "/:pokemonId"
      render = {(props) => <Pokemon {...props}
      />}      
      /> 

      
     </Switch>
    </div>
  );
}

export default App;
