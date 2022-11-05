import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sorting from './pages/Sorting';
import Pathfinding from './pages/Pathfinding';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/sort' element={<Sorting />} />
        <Route path='/pathfinding' element={<Pathfinding />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;