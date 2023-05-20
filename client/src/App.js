import './App.css';
import { Route, BrowserRouter} from "react-router-dom";
import LandingPage from './Components/LandingPage/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Route exact path='/' component={LandingPage}/>

        
       

        
      </div>
    </BrowserRouter>
  );
}

export default App;