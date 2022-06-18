import React from 'react'

function Table({demandes,id}) {
  return (
    <div>
        <table className='table responsive-table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Vehicule</th>
                    <th>description</th>
                    <th>statut</th>
                </tr>
            </thead>
            <tbody>
                {demandes.length !==0 ? 
                        demandes.map((demande) => { 
                                return (
                                <tr key={demande.id} className={id===demande.id ? 'bg-light' : ''}>
                                            <td>{demande.id}</td>
                                            <td>{demande.vehicule}</td>
                                            <td>{demande.description}</td>
                                            <td>{demande.statut}</td>
                                        </tr>
                                        )}):<tr></tr>}
            </tbody>
        </table>
    </div>
  )
}

export default Table