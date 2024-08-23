import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home"
import AnimeDetails from "../pages/AnimeDetails";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Home /> },
            {path: 'anime/:animeId/details', element: <AnimeDetails />}
        ],
    },
])

export default router