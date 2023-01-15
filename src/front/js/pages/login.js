import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
    // local States: para poder tener email/pass en una variable y enviar a backend. Componente controlado.
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const handleClick = () => {

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }

        fetch('https://3001-4geeksacade-reactflaskh-j7dwm0jofz6.ws-us82.gitpod.io/api/token', options)
            .then(resp => {
                if(resp.status === 200) return resp.json();
                else alert ('there has been some problem issues');
            })
            .then()
            .catch(error => {
                console.error('We have a problem', error)
            })
    }

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
                <input type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleClick}>Login</button>
            </div>
		</div>
	);
};