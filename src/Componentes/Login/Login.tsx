import { useState } from "react";
import { LoginData } from "../../Interfaces/LoginData";
import { LoginAPI } from "../../Servicos/MercadoFacilAPI";
import './Login.css';

const Login = () => {
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    });

    const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleSubmit = async (event: React.MouseEventHandler<HTMLButtonElement> | any) => {
        event.preventDefault();
        try {
            const response = await LoginAPI(loginData);
            if (response.data && response.status === 200) {
                alert('Login realizado com sucesso');
                sessionStorage.setItem('token', response.data.token);
                const testeRecuperaDado = sessionStorage.getItem('token');
                alert('Dado Recuperado do session storage: ' + testeRecuperaDado);
                window.location.href = '/Home/AreaLogada';
            } else {
                alert('Falha no login');
            }
        } catch (e) {
            console.error('Falha no login: ' + e.message);
        }
    }

    return (
        <div className="login-container">
            <div className="image-container">
                <img src="https://imgs.search.brave.com/ab53yGUMezgiblJWYnGXwk3q0cLr8lrwQu6ZFol2fK8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzc2LzI0LzQ1/LzM2MF9GXzE3NjI0/NDU1OF9uNVRkR213/dm9FMUtWU3hnaVBM/ZjVOSWdBTThvcnVp/Vi5qcGc" alt="Avatar" />
            </div>
            <div className="spacer">
                <h3>Mercado Fácil</h3>
            </div>
            <div className="LoginForm">
                <form className="login-form-inline">
                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        value={loginData.email}
                        onChange={handleLogin}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={loginData.password}
                        onChange={handleLogin}
                    />
                    <button className="submit-button" onClick={handleSubmit}>Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
