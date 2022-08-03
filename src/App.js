
import { Routes, Route } from 'react-router-dom';
import Component from './pages/list';
import ComponentHome from './pages/list';
import "bootstrap/dist/css/bootstrap.min.css";




function App() {

  return (
    <Routes>
      <Route path="/" element={<Component />} />
      <Route path="/home" element={<ComponentHome />} />

    </Routes>
  );
}

export default App;

