// import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { useContext, useState } from 'react'
import { Context } from '../main'

import { useForm } from 'react-hook-form'

export default function Producto() {
  const params = useParams()
  
  const [estado, setEstado] = useContext(Context);

  const { data, isLoading, error } = useQuery("productos", () => {
    return fetch(`http://localhost:3333/productos/$ }`)
      .then(res => res.json())
  } );


  //el "data" de la linea 32 se refiere al producto que actualmente tengo en pantalla
  
  const cantidad = estado.cesta.find(i => i.producto.ProductID === Number(params.codigo))?.cantidad;
  const { register, handleSubmit } = useForm(
    { defaultValues: { cantidad: cantidad } }
  );

  function onSubmit(datos) {
    // console.log(data, estado.cesta)
    setEstado({
      ...estado, cesta: [...estado.cesta.filter(i => i.producto.ProductID != data[0].ProductID), {  //este data[0] es el producto que tenemos en pantalla
        producto: data[0], cantidad: datos.cantidad,
        total: data[0].UnitPrice * datos.cantidad
      }]
    })
  }

  if (isLoading) {
    return <div>Cargando.....</div>
  }

  return (
    <div>
      <h3>Producto</h3>
      <table className="table w-50">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <td>{data[0].ProductID}</td>
          </tr>
          <tr>
            <th scope="col">Nombre</th>
            <td>{data[0].ProductName}</td>
          </tr>
          <tr>
            <th scope="col">Precio</th>
            <td>{data[0].UnitPrice}</td>
          </tr>
        </thead>
      </table>
    

      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Introduzca cantidad</label>
          <input {...register('cantidad')} type="number" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Añadir al carrito</button>
      </form>
      {/* {JSON.string  ify(estado.cesta)} */}
    </div>
  )
    
}