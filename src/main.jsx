import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";

import './index.css'
import ErrorPage from './ErrorPage.jsx'
import App from './App.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Cartelera from './Cartelera.jsx';
import FilmDetails from './FilmDetails.jsx';
import { loader as Loader } from './FilmDetails.jsx';
import FilmBuy from './FilmBuy.jsx';
import { loader as Loader2 } from './FilmBuy.jsx';
import DatosReserva from './DatosReserva.jsx';
import FavoritesPage from './FavoritesPage.jsx';
import Reservas from './Reservas.jsx';
import store from './store/store.js'
import { Provider } from 'react-redux'

/**
 * La función AppLayout devuelve un componente de diseño con un componente Outlet y un componente
 * Footer.
 */
function AppLayout() {
  return <>
    <Header />
    <Outlet />
    <Footer />
  </>
}

/* El código crea un enrutador usando la función `createBrowserRouter` de la biblioteca
`react-router-dom`. La configuración del enrutador se pasa como una matriz de objetos. */
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [{
      path: "/",
      element: <App />,
    },
    {
      path: "/cartelera",
      element: <Cartelera />,
    },
    {
      path: "/FavoritesPage",
      element: <FavoritesPage />,
    },
    {
      path: "/Reservas",
      element: <Reservas />,
    },
    {
      path: "/datosReserva",
      element: <DatosReserva />,
    },
    {
      path: "/FilmDetails/:id",
      element: <FilmDetails />,
      loader: Loader
    },
    {
      path: "/FilmBuy/:id",
      element: <FilmBuy />,
      loader: Loader2
    }]
  }
]);


/* `ReactDOM.createRoot(document.getElementById('root')).render()` está representando el componente
raíz de la aplicación. */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
