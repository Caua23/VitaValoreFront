import React, { useState } from 'react';
import InputCnpj from '../CnpjInput';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


function FormRegister() {
    const [name, setNome] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFantasia(name);
        const RegisterData = { fantasia,name, email, cnpj, password };
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

            const responseText = await response.text(); 

            if (response.ok) {
                const data = JSON.parse(responseText); 
                
                const token = data.token;
                Cookies.set('Bearer', token, { path: '/', sameSite: 'Lax', expires: 15 });
                navigate('/Empresa/Home');
            } else {
                setErrorMessage(responseText)
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            setErrorMessage('Erro ao realizar o registro. Tente novamente.');
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
                    <p id='error' className='error duration-200'>{errorMessage}</p>
                    <p>Já possui conta? <a href="/auth/login" className="login text-white underline hover:text-purple-primary duration-500">faça login</a></p>
                    <button type="submit" className="submit-button">Registrar</button>
                </div>
            </form>
        </div>
    );
}

export default FormRegister;
