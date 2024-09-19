// src/App.js

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/homePage';
import SignInPage from './pages/SingInPage';
import LoginPage from './pages/loginPage';


function App() {
    
    
    return (

        <Router>     
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/register" element={<SignInPage />} />
                <Route path="/auth/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
