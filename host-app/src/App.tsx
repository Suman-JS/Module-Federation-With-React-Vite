import "./App.css";
import { lazy } from "react";

const Button = lazy(() => import("remoteApp/Button"));

function App() {
	return (
		<>
			<div>
				<Button />
			</div>
		</>
	);
}

export default App;
