import React, { useState } from 'react';
import InputCnpj from '../CnpjInput';
import { useNavigate } from 'react-router-dom';

function FormRegister() {
    const [name, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState(''); // Garantir que o valor inicial é uma string vazia
    const [password, setPassword] = useState('');
    const [errorMessage, SetErrorMessage] = useState('');
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


            const responseText = await response.text(); // Obter o texto da resposta



            if (response.ok) {
                // Registro bem-sucedido
                navigate('/Empresa/Home');
            } else {
                
                navigate('/auth/register');
                SetErrorMessage(responseText);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }

    };

    return (
        <div className="login-container">
            <h2>Registrar</h2>
            <form onSubmit={handleSubmit} className="register-form">
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

                <p>Já possui conta? <a href="/auth/login" className="login">faça login</a></p>
                <p id='error' className='error'> {errorMessage} </p>
                <button type="submit" className="submit-button">Registrar</button>
            </form>
        </div>
    );
}

export default FormRegister;
