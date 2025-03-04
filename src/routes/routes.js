import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './private/private.routes';
import ProtectedRoutes from 'containers/guards/protected-route';
import NonProtectedRoutes from 'containers/guards/non-protected-routes';
import PublicRoutes from './public/public.routes';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/private/*' element={<ProtectedRoutes><PrivateRoutes /></ProtectedRoutes>} />
            <Route path='/*' element={<NonProtectedRoutes><PublicRoutes /></NonProtectedRoutes>} />
        </Routes>
    )
}

export default AppRoutes;