import Home from './views/home/Home';
import Details from './views/details/Details';
import Navbar from './components/navbar/Navbar';

function App() {
  const { pathname } = useLocation();

  return (
    <div>
      <div>{(pathname !== '/login' && pathname !== '/') && <Navbar />}</div>

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/details/:id' element={<Details />} />
        {/* Otras rutas */}
      </Routes>
    </div>
  );
}

export default App;

