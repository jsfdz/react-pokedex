import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthContext } from './providers/AuthContext'
import { Home } from './views/Home'
import { Login } from './views/Login'
import { Pokedex } from './views/Pokedex'
import { PokemonDetails } from './views/PokemonDetails'
import { Error404 } from './views/Error404'

export const App = () => {
  return (
    <AuthContext>
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Home />} />
          <Route path="/login" exact render={() => <Login />} />
          <Route path="/pokedex" exact render={() => <Pokedex />} />
          <Route path="/pokedex/:id" render={() => <PokemonDetails />} />
          <Route path="*" render={() => <Error404 msg={'Uh oh, you seem lost on your journey!'} linkTo={'/'} />} />
        </Switch>
      </Router>
    </AuthContext>
  )
}
