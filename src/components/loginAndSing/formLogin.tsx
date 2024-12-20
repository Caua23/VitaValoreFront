import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


function FormLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginData = { email, password };
        const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;
        
        if (!apiUrl) {
            console.error('API URL não configurada');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            const responseText = await response.text(); 

            if (response.ok) {
                const data = JSON.parse(responseText); 

                const token = data.token;

                if (token) {
                    await Cookies.set('Bearer', token, { path: '/', sameSite: 'Lax', expires: 15 });
                    navigate('/Empresa/Home');
                }
            } else {
                setErrorMessage(responseText);
                
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setErrorMessage('Erro ao realizar o login. Tente novamente.');
        }
    };

    return (
        <div className="login-container">
            <h2>Entrar</h2>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Digite seu email"
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label>Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>
                <p className="error duration-200">{errorMessage}</p>
                <p>Não tem uma conta? <a href="/auth/register" className="register underline text-white hover:text-purple-primary duration-500">Cadastre-se</a></p>
                <button type="submit" className="submit-button">Entrar</button>
            </form>
        </div>
    );
}

export default FormLogin;
