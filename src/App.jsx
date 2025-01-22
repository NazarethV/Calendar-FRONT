import Home from './views/home/Home';
import Details from './views/detail/Details';
import { Route, Routes } from 'react-router-dom';
import NewRental from './components/NewRental';
// import Navbar from './components/';

function App() {

  return (
    <div>

      <Routes>
        {/* <Route path='/' element={<Landing />} /> */}
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path="/new-rental" element={<NewRental />} />
        {/* Otras rutas */}
      </Routes>
    </div>
  );
}

export default App;


