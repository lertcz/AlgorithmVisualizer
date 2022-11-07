import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';

import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import Sorting from './pages/Sorting/Sorting';
import Pathfinding from './pages/Pathfinding';

function App() {
  return (
    <>
    <HashRouter> {/* <HashRouter> | <Router> */}
      <Navbar />
      <Routes>
        <Route path='/AlgorithmVisualizer' exact element={<Home />} />
        <Route path='/AlgorithmVisualizer/sort/:algorithm' element={<Sorting />} />
        <Route path='/AlgorithmVisualizer/pathfinding' element={<Pathfinding />} />
      </Routes>
    </HashRouter> {/* </HashRouter> | </Router> */}
    </>
  );
}

export default App;