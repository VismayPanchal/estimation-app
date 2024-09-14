import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import LoginPage from './Components/LoginPage';
import ProtectedRoute from "./Components/ProtectedRoute";
import ProjectList from "./Components/Project/ProjectList";
import CreateProject from "./Components/Project/CreateProject";

function App() {

	return (
		<Router>
			<Routes>

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<></>
						</ProtectedRoute>
					}
				/>
				<Route
					path='/Projects'
					element={
						<ProtectedRoute>
							<ProjectList />
						</ProtectedRoute>
					} />
				<Route
					path='/Add-project'
					element={
						<ProtectedRoute>
							<CreateProject />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</Router>
	)
}

export default App
