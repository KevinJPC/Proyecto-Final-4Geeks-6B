import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { store, actions } = useContext(Context);

	const handleSubmit = e => {
		e.preventDefault();
		if (email === "" || pass === "") {
			alert("correo y contraseña son requeridos");
		}
		console.log(email, pass);

		const data = { email: email, password: pass };

		fetch("https://3000-yellow-armadillo-foo75dkb.ws-us03.gitpod.io/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
				sessionStorage.setItem("u_token", data.token);
				actions.loadFav();
				actions.addUser(data.user);
				setRedirect(true);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	return (
		<div className="fondoregistro">
			<p id="Login-user">Iniciar sesión</p>
			<div className="text-center mt-5 d-flex justify-content-center align-items-center" id="fondonegro">
				<form style={{ width: "400px" }} onSubmit={e => handleSubmit(e)}>
					<div className="form-floating">
						<input
							type="email"
							className="form-control"
							id="floatingInput"
							placeholder="Email"
							onChange={e => setEmail(e.target.value)}
						/>
						<label htmlFor="floatingPassword" id="floatingPassword">
							nombre@ejemplo.com
						</label>
					</div>
					<label htmlFor="floatingPassword" id="floatingPassword" />
					<div className="form-floating">
						<input
							type="password"
							className="form-control"
							id="floatingInput"
							placeholder="Password"
							onChange={e => setPass(e.target.value)}
						/>
						<label htmlFor="floatingPassword" id="floatingPassword">
							contraseña
						</label>
						<Link to="/recoverPassword">
							<input
								type="submit"
								className="button-login"
								value="¿Olvidaste tu contraseña?"
								id="recover-password"
							/>
						</Link>
					</div>

					<input type="submit" className="button-login" value="Inicio de sesión" id="login" />
				</form>
				{redirect ? <Redirect to="/" /> : ""}
			</div>
		</div>
	);
};
