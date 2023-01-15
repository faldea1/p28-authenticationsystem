import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light" style={{paddingTop: 20 }}>
			<div className="container">
				<Link to="/">
					<span style={{color: 'blue', fontSize: 25 }} className="navbar-brand mb-0 h1">Welcome</span>
				</Link>
				<div className="ml-auto">
					{!store.token ?
					<Link to="/login">
						<button className="btn btn-primary">Log in</button>
				</Link>
					:
					<button onClick={() => actions.logout()} className="btn btn-primary">Log out</button>
					}
				</div>
			</div>
		</nav>
	);
};
