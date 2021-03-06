const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			// restaurants: null,
			user: null,
			favoritesRestaurant: null,
			pageNotFound: false
		},
		actions: {
			// Use getActions to call a function within a fuction

			// getRestaurants: () => {
			// 	fetch(process.env.BACKEND_URL + "/api/restaurants", { method: "GET" })
			// 		.then(resp => resp.json())
			// 		.then(data => setStore({ restaurants: data.results }))
			// 		.catch(error => console.log("Error", error));
			// },
			loadSession: () => {
				setStore({ pageNotFound: false });
				fetch(process.env.BACKEND_URL + "/api/session/", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("u_token")
					}
				})
					.then(res => {
						if (res.ok == false) {
							setStore({ pageNotFound: true });
						}
						return res.json();
					})
					.then(data => {
						// getActions().getFavorites();
						if (data.status) {
							setStore({ user: data.user });
							sessionStorage.setItem("u_token", data.token);
						}
					})
					.catch(error => console.log("Error", error));
			},
			AddFavoriteRestaurant: userRestaurantId => {
				fetch(process.env.BACKEND_URL + "/api/client/favorite/" + userRestaurantId, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("u_token")
					}
				})
					.then(res => res.json())
					.then(data => {
						// getActions().getFavorites();
						setStore({ favoritesRestaurant: data.results });
						console.log(data);
					})
					.catch(error => console.log("Error", error));
			},
			getFavorites: () => {
				setStore({ pageNotFound: false });
				fetch(process.env.BACKEND_URL + "/api/client/favorite", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("u_token")
					}
				})
					.then(res => {
						if (res.ok == false) {
							setStore({ pageNotFound: true });
						}
						return res.json();
					})
					.then(data => {
						setStore({ favoritesRestaurant: data.results });
						console.log(data);
					})
					.catch(error => console.log("Error", error));
			},

			getUser: user => {
				setStore({ user: user });
			},

			logOut: () => {
				setStore({ user: null, favoritesRestaurant: null });
				sessionStorage.removeItem("u_token");
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			deleteFavorite: userRestaurantId => {
				fetch(process.env.BACKEND_URL + "/api/client/favorite/" + userRestaurantId, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + sessionStorage.getItem("u_token")
					}
				})
					.then(res => res.json())
					.then(data => {
						console.log(data);
						getActions().getFavorites();
					});
			}
		}
	};
};

export default getState;
