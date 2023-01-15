import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    // local States: para poder tener email/pass en una variable y enviar a backend. Componente controlado.
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const navigate = useNavigate();

  
    console.log('this is your token', store.token);

    const handleClick = () => {
        actions.login(email, password);
    };

    if(store.token && store.token != "" && store.token != undefined) navigate("/");

	return (
		<div className="text-center mt-5">
			<h1 style={{color: 'white', margin: 40}}>Login Here</h1>
                {(store.token && store.token != "" && store.token != undefined) ? "You are logged in with this token!" + store.token :
                <div>  
                    <div>
                        <input style={{margin: 5, fontStyle: 'italic'}}  type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div> 
                    <div>
                        <input style={{margin: 5, fontStyle: 'italic' }} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div> 
                    <div>
                    <button style={{margin: 10, fontWeight: 'bold', backgroundColor: 'grey', borderRadius: 5}} onClick={handleClick}>Login</button>
                    </div> 
                </div>
                }
		</div>
	);
};