import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage";
import Navigation from "./Components/Nav";
import TriviaGenPage from './Pages/TriviaGenPage';
import TriviaReviewPage from './Pages/TriviaReviewPage';
import MyTrivia from './Pages/MyTrivia';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

let signedIn = false;

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
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
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
