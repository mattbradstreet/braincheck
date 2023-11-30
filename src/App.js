import './App.css';
import { createContext } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import MainPage from './Components/MainPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;