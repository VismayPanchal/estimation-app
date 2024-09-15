import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";
import LoginPage from './Components/Login/LoginPage';
import ProtectedRoute from "./Components/ProtectedRoute";
import ProjectList from "./Components/Project/ProjectList";
import CreateProject from "./Components/Project/CreateProject";
import EstimationList from "./Components/Estimation/EstimationList";
import CreateEstimation from "./Components/Estimation/CreateEstimation";
import Dashboard from "./Components/Dashboard";

function App() {

	return (
		<Router>
			<Routes>

				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
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
				<Route
					path='/Add-project/:projectId'
					element={
						<ProtectedRoute>
							<CreateProject />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/Estimations'
					element={
						<ProtectedRoute>
							<EstimationList />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/Add-estimation'
					element={
						<ProtectedRoute>
							<CreateEstimation />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/Add-estimation/:id'
					element={
						<ProtectedRoute>
							<CreateEstimation />
						</ProtectedRoute>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</Router>
	)
}

export default App
