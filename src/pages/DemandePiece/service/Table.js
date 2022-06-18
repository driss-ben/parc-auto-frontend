import React from 'react'

function Table({internes,id}) {
  return (
    <div>
        <table className='table responsive-table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Vehicule</th>
                    <th>date debut</th>
                    <th>date fin</th>
                    <th>statut</th>
                </tr>
            </thead>
            <tbody>
                {internes.length !==0 ? 
                    internes.map((interne) => { 
                            return (
                            <tr key={interne.id} className={id===interne.id ? 'bg-light' : ''}>
                                        <td>{interne.id}</td>
                                        <td>{interne.vehicule}</td>
                                        <td>{interne.dateDebut} </td>
                                        <td>{interne.dateFin}</td>
                                        <td>{interne.statut}</td>
                                    </tr>
                                    )}):<tr></tr>}
            </tbody>
        </table>
    </div>
  )
}

export default Table