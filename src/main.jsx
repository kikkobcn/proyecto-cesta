import React from 'react'
import { createRoot } from "react-dom/client";

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import Home from './components/Home';  
import Productos from './components/Productos';  
import Producto from './components/Producto';  
import Cesta from './components/Cesta';
import './index.css'

import { QueryClient, QueryClientProvider } from 'react-query'  


import { createContext } from 'react'
export const Context = createContext(null);

const queryClient = new QueryClient();

function App() {
  const [estado, setEstado] = React.useState({
    cesta: []       //esto contiene todos lo elementos que se van metiendo en la cesta
  });

  return <React.StrictMode>
  <Context.Provider value={[estado, setEstado]}> 
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="*" element= {<h2>Ruta no contemplada</h2>} />
            {/* <Route index element= {<Home />} /> ruta inici */}
            <Route path="productos" element= {<Productos />} />
            <Route path="productos/:codigo" element={<Producto />} />
              {/*<Route path="productos/:codigo/imagen" element={<h3>foto</h3>}/></Route>*/}                  {/*es la subruta de productos/:codigo  x ver la imagen del producto*/}
            <Route path="cesta" element={<Cesta />} />   
          </Route>
        </Routes>
      </BrowserRouter>
      </QueryClientProvider>
  </Context.Provider>
</React.StrictMode>
}

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <App />
)


//ReactDom.render() has been deprecated 