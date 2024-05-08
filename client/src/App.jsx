import Recommendation from './components/Recommendation';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './components/Root';
import Home from './components/Home';
import Categories from './components/Categories';
import S2d from './components/S2d';

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
                path: '/healthcare',
                element: <S2d />
            }
        ]
    }]);

    return (
        <RouterProvider router={router} />
    )
}