import React from 'react'

function Table({entretiens,id}) {
  return (
    <div>
        <table className='table responsive-table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Vehicule</th>
                    <th>Type</th>
                    <th>date</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                {entretiens.length !==0 ? 
                        entretiens.map((entretien) => { 
                                return (
                                <tr key={entretien.id} className={id===entretien.id ? 'bg-light' : ''}>
                                            <td>{entretien.id}</td>
                                            <td>{entretien.vehicule}</td>
                                            <td>{entretien.typeIntervention}</td>
                                            <td>{entretien.date}</td>
                                            <td>{entretien.demandeIntervention.description}</td>
                                        </tr>
                                        )}):<tr></tr>}
            </tbody>
        </table>
    </div>
  )
}

export default Table