import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommonAdmin from './pages/admin/CommonAdmin';
import CommonWeb from './pages/web/CommonWeb';
import FlightComponent from './components/admin/FlightComponent';
import AirportComponent from './components/admin/AirportComponent';
import AirlineComponent from './components/admin/AirlineComponent';
import FlightDetail from './components/admin/detail/FlightDetail';
import PlaneComponent from './components/admin/PlaneComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         
          <Route path="/*" element={<CommonWeb />} />

        
          <Route path="/admin/*" element={<CommonAdmin />}>
            <Route path="flight" element={<FlightComponent />} />
            <Route path="flight/create" element={<FlightDetail />} />
            <Route path="airport" element={<AirportComponent />} />
            <Route path="airline" element={<AirlineComponent />} />
            <Route path="plane" element={<PlaneComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
