import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import SignInPage from "./pages/SingInPage";
import LoginPage from "./pages/loginPage";
import HomeEmpresa from "./pages/HomeEmpresa";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/register" element={<SignInPage />} />
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/Empresa/*"
          element={
          <ProtectedRoute>
            <HomeEmpresa />
          </ProtectedRoute>
              
          
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
