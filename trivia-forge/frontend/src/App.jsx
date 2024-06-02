import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePage";
import Navigation from "./components/Navigation";
import TriviaGenPage from './pages/triviaGenPage';
import TriviaReviewPage from './pages/triviaReviewPage';
import MyTriviaPage from './pages/myTriviaPage';
import LoginPage from './pages/loginPage';
import SignUpPage from './pages/signUpPage';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


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
            <Route path="/review" element={<TriviaReviewPage />} />
            <Route path="/myTrivia" element={<MyTriviaPage />} />
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
