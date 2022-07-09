import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home'
import DogDetail from './Components/DogDetail';
import FormDog from './Components/FormDog'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path= '/home' component= {Home} />
      <Route exact path= '/detail/:id' component= {DogDetail} />
      <Route exact path= '/create' component={FormDog}/>

    </div>
    </BrowserRouter>
  );
}

export default App;
