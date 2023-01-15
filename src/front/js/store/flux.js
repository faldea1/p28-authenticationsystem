const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromLocalStore: () => {
				const token = localStorage.getItem("token");
				console.log('aplication loaded, synching the local storage token');
				if(token && token !="" && token != undefined) setStore({ token: token });
			},

			logout: () => {
				localStorage.removeItem("token");
				console.log('Log off');
				setStore({ token: null });
			},

			//Realizar fetch aquí para que sea una variable global (para que toda la aplicación tenga acceso al token almacenado).
			login: async (email, password) => {
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				};

				try {
					const resp = await fetch('https://3001-4geeksacade-reactflaskh-j7dwm0jofz6.ws-us82.gitpod.io/api/token', options)
					if (resp.status !== 200){
						alert ('there has been some problem issues');
						return false;
					} 
					
					const data = await resp.json();
					console.log('from the backend', data);		
					//localStorage o sessionStorage: guardar token y no perderlo al "actualizar". Guardar variable x con valor x.					
					localStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				}
				catch(error){
					console.error('there has been an error trying login in')
				}
			},


			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
