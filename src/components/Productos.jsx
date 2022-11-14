// import React from 'react'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';


export default function Productos() {
  const { isLoading, data, error } = useQuery("productos", () => {
    return fetch("http://localhost:3333/productos").then(res => res.json());
  });
  if (isLoading) {
  return <>Cargando......</>
  }
  if (error) {
    return <>{JSON.stringify(error)}</>
  }
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
          </tr> 
        </thead>
        <tbody>
          {/*con map corremos todos los productos*/}
          {data.map(producto => (           
            <tr key={producto.ProductID}>
              <td>
                <Link to={`/productos/${producto.ProductID}`}>  {/*aqui entramos en un producto en concreto*/}
                  {producto.ProductName}
                </Link>
              </td>
              <td>{producto.UnitPrice}</td>
            </tr>
          ))}
        </tbody>  
      </table>     
  </div>
  )
}