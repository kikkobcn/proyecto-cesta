import React from 'react'
import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react'
import { Context } from '../main'
import {ethers} from 'ethers'

export default function Cesta() {
  const [estado, setEstado] = useContext(Context)
  const [cuenta, setCuenta] = useState();
  const [txOk, setTxOk] = useState();
  const [txRechazo, setTxRechazo] = useState();
  const total = estado.cesta.reduce((acum, i) => acum + i.total, 0);

  useEffect(() => {
    ethereum && ethereum.request({ method: 'eth_requestAccounts' }).then(i => {
      setCuenta(i[0])
      ethereum.on('accountsChanged', (i) => {
        setCuenta(i[0])
      })
    });
  }, [])

  async function pagar() {
     setTxOk(false)
    setTxRechazo(false)
    const transactionParameters = {
      to: '0xaE714f36bc53C2297102BaC966Dc453A5dE99cdB',                   // Cuenta del comercio.
      from: ethereum.selectedAddress,                                // la cuenta activa del metamask
      value: ethers.utils.parseEther(total.toString()).toHexString()
    };
    try {
      const txHash = await ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });
      setTxOk(txHash) // tx ok
    } catch (error) {
      setTxRechazo(error) // cancelada por la razón que sea
    } finally {
      // final
    }
  }

  return (
    <div> 
      <table className="table">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
        <tbody>
          {estado.cesta.map(i => (
              <tr key={i.producto.ProductID}>
                <td><Link to={`/productos/${i.producto.ProductID}`}>{i.producto.ProductName}</Link> </td>
                <td> {i.producto.UnitPrice} </td>
                <td>{i.cantidad} </td>
                <td> {i.total} </td>
              </tr>
            ))}
          </tbody>
</table>
      <div> Total a pagar:  {total}</div>
      <div> Cuenta:  {cuenta}</div>
      <button className='my-3 btn btn-primary' onClick={() => { pagar() }}>Pagar</button>

    {txOk &&<div className='my-3 alert alert-successr'>Transaccion OK: {txOk}</div>}
      {txRechazo && <div className='my-3 alert alert-danger'>Transaccion cancelada: {JSON.stringify(txRechazo.message)}</div>}
      
    </div>
  )
}