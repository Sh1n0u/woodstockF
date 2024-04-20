import React, { useState, useEffect } from 'react';
import { useNavitage } from 'react-router-dom';
import axios from 'axios';

function Login() {
    useEffect(() => {
        document.title = 'Login';
    }, []);

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavitage();

    const handleUserIDChange = (e) => {
        setUserID(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefautl();

        try {
            const response = await axios.post(SERVEUR_URL, {
                userID: userID,
                password: password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/landing');
        } catch (error) {
            console.error('Erreur lors de la requête: ', error);
        }
    };
}

return (
    <div className="login-page">
        <div className="logo"></div>

        <div className="login-form">
            <p>Connexion</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="userID" />
                <input
                    type="text"
                    name="userID"
                    id="userID"
                    placeholder="Identifiant Utilisateur"
                    value={userID}
                    onChange={handleUserIDChange}
                    required
                />

                <label htmlFor="password"></label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />

                <button type="submit" placeholder="Connexion" />
            </form>
        </div>
    </div>
);
