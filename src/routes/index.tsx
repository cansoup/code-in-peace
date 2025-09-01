import {createBrowserRouter, RouterProvider} from 'react-router'
import Home from "../pages/Home.tsx";
import About from "../pages/About.tsx";
import Project from "../pages/Projects.tsx";
import DefaultLayout from "../components/layouts/Default.tsx";

const router = createBrowserRouter([
    {
        element: <DefaultLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/about',
                element: <About/>
            },
            {
                path: '/projects',
                element: <Project/>
            }
        ]
    },
])

export default function Router() {
    return <RouterProvider router={router}/>
}
