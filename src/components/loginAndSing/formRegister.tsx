import React, { useState } from 'react';
import InputCnpj from '../CnpjInput';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Alert } from '@mui/material';

function FormRegister() {
    const [name, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const RegisterData = { name, email, cnpj, password };
        const apiUrl = import.meta.env.VITE_VITAVALORE_API_URL;

        if (!apiUrl) {
            console.error('API URL não configurada');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(RegisterData),
            });

            const responseText = await response.text(); // Captura a resposta como texto

            if (response.ok) {
                const data = JSON.parse(responseText); // Tenta analisar como JSON
                
                const token = data.token;
                Cookies.set('Bearer', token, { path: '/', sameSite: 'Lax', expires: 15 });
                navigate('/Empresa/Home');
            } else {
                <Alert severity="error">{responseText}</Alert>
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setErrorMessage('Erro ao realizar o registro. Tente novamente.'); // Mensagem genérica de erro
        }
    };

    return (
        <div className="Register-container">
            <h2>Registrar</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className='flex-form'>
                    <div>
                        <div className="form-group">
                            <label>Nome</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite seu nome"
                                required
                            />
                        </div>

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
                    </div>
                    <div>
                        <InputCnpj
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="Digite seu CNPJ"
                            required
                        />
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
                    </div>
                </div>

                <div>
                    <p>Já possui conta? <a href="/auth/login" className="login">faça login</a></p>
                    <p id='error' className='error'>{errorMessage}</p>
                    <button type="submit" className="submit-button">Registrar</button>
                </div>
            </form>
        </div>
    );
}

export default FormRegister;
