import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Route exact path='/' component={LandingPage}/>
      <Route exact path= '/home' component= {Home} />

    </div>
    </BrowserRouter>
  );
}

export default App;
