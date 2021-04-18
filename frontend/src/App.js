import React from 'react'
import {Route} from 'react-router-dom'
import SignIn from './screens/SignIn.js'
import LogIn from './screens/LogIn.js'
import HomeScreen from './screens/HomeScreen.js'
import SearchResult from './screens/SearchResult.js'
import EditAccount from './screens/EditAccount.js'
import MyMovies from './screens/MyMovies.js'
import PrivateRoute from './components/PrivateRoute.js'

function App() {
  return (
    <div className="App">
      <Route path='/' component={HomeScreen} exact />
      <Route path='/signin' component={SignIn} exact/>
      <Route path='/login' component={LogIn} exact/>
      <PrivateRoute path='/search/:movie' component={SearchResult} exact/>
      <PrivateRoute path='/editAccount' component={EditAccount} exact/>
      <PrivateRoute path='/myMovies' component={MyMovies} exact/>
    </div>
  );
}

export default App;
