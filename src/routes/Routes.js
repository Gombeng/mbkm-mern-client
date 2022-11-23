import * as React from 'react';
import {
	BrowserRouter as Router,
	Routes as Switch,
	Route,
} from 'react-router-dom';
import {
	Login,
	Register,
	MainApp,
	Dashboard,
	Logsheet,
	Profil,
	NotFound,
	Detail,
	PilihCpmk,
} from '../pages/Pages';

const IsiBorang = React.lazy(() => import('../pages/isiBorang/IsiBorang'));

const Routes = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="login" element={<Login />} />
				<Route exact path="register" element={<Register />} />
				<Route exact path="/" element={<MainApp />}>
					<Route index element={<Dashboard />} />
					<Route exact path="dashboard" element={<Dashboard />} />
					<Route
						exact
						path="isi-borang"
						element={
							<React.Suspense fallback={<>...</>}>
								<IsiBorang />
							</React.Suspense>
						}
					/>
					<Route
						exact
						path="isi-borang/:subject/:idBorang"
						element={<PilihCpmk />}
					/>
					<Route
						exact
						path="isi-borang/:idMatkul/:idCpmk"
						element={<Detail />}
					/>
					<Route exact path="logsheet" element={<Logsheet />} />
					<Route exact path="profil" element={<Profil />} />
					<Route exact path="*" element={<NotFound />} />
				</Route>
			</Switch>
		</Router>
	);
};

export default Routes;
