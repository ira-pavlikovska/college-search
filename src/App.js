import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import CollegeSearchPage from "./pages/CollegeSearchPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CollegeSearchPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
