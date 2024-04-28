import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Navigation from "./Components/Nav";
import TriviaGenPage from './Pages/TriviaGenPage';
import TriviaReviewPage from './Pages/TriviaReviewPage';
import MyTrivia from './Pages/MyTrivia';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [count, setCount] = useState(0)

  return (

    <div className="App">
      <BrowserRouter>

        <header></header>
        <Navigation />
        <main>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/triviaGen" element={<TriviaGenPage />} />
            <Route path="/review" element={<TriviaReviewPage />} />
            <Route path="/myTrivia" element={<MyTrivia />} />
          </Routes>

        </main>

        <footer>
          <p>© 2024 Trivia Forge. All rights reserved.</p>
        </footer>
      </BrowserRouter>
    </div>

  )
}

export default App