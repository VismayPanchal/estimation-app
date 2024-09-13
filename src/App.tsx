import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {

	return (
		<Router>
			<Routes>

				<Route element={<ProtectedRoute />}>
					<Route path='/dashboard' />
				</Route>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</Router>
	)
}

export default App
