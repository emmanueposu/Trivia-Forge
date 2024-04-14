import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Navigation from "./components/Nav";
import TriviaGenPage from './Pages/TriviaGenPage';
import MyTrivia from './Pages/MyTrivia';


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <header></header>
        <Navigation />
        <main>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/triviaGen" element={<TriviaGenPage />} />
            <Route path="/myTrivia" element={<MyTrivia />} />
          </Routes>

        </main>

        <footer></footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
