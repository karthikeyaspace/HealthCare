import Recommendation from './components/Recommendation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Home from './components/Home';

export default function App(){

    let router = createBrowserRouter([{
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/symptom-checker',
                element: <Recommendation />
            }
        ]
    }]);

    return (
        <RouterProvider router={router} />
    )
}