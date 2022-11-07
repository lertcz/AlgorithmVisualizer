import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // BrowserRouter | HashRouter
import Home from './pages/Home';
import Sorting from './pages/Sorting/Sorting';
import Pathfinding from './pages/Pathfinding';

function App() {
  return (
    <>
    <Router> {/* <HashRouter> | <Router> */}
      <Navbar />
      <Routes>
        <Route path='/AlgorithmVisualizer' element={<Home />} />
        <Route path='/AlgorithmVisualizer/sort/:algorithm' element={<Sorting />} />
        <Route path='/AlgorithmVisualizer/pathfinding' element={<Pathfinding />} />
      </Routes>
    </Router> {/* </HashRouter> | </Router> */}
    </>
  );
}

export default App;