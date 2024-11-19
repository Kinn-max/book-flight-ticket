// src/App.js
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CommonAdmin from './pages/admin/CommonAdmin';
import CommonWeb from './pages/web/CommonWeb';
import FlightComponent from './components/admin/FlightComponent';
import AirportComponent from './components/admin/AirportComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<CommonWeb />} >
  
          </Route>
          <Route path="/admin/*" element={<CommonAdmin />}>
            <Route path="flight" element={<FlightComponent />} />
            <Route path="airport" element={<AirportComponent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
