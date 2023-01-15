import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect( () => {
		if(store.token && store.token != "" && store.token != undefined) actions.getMessage();

	}, [store.token])

	return (
		<div className="text-center mt-5">
			<h1 style={{color: 'white', margin: 40}}>Testing Authentication System</h1>
			<div className="alert alert-info">{store.message}</div>
		</div>
	);
};
