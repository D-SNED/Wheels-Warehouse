import {useState, useEffect} from 'react'

function ServiceHistory(){

    const [appointments, setAppointments] = useState([]);
    const [searchVin, setSearchVin ] = useState("");


    const fetchData = async () => {
        const response = await fetch ('http://localhost:8080/api/appointments/');

        if(response.ok) {
            const data = await response.json();
            //console.log(data);
            setAppointments(data.appointments);
        }
    }

    const searchFeature = async (vin) => {
        const showVin = appointments.filter(appointment => appointment.vin === vin)
        setAppointments(showVin);

    }



    useEffect(() => {
        fetchData()
    }, [])

    return(
        <>
            <h1>Service History</h1>
            <div className="input-group mb-3">
                <input onChange={(e) => setSearchVin(e.target.value)} value={searchVin} type="text" className="form-control" placeholder="Search by VIN" aria-label="Search"/>
                <div className="input-group-append">
                    <button onClick={() => searchFeature(searchVin)} className="btn btn-outline-secondary" type="button">Search</button>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map(appointment => {
                        return (
                            <tr key = {appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.is_vip ? "Yes" : "No"}</td>
                                <td>{appointment.customer}</td>
                                <td>{new Date(appointment.date_time).toLocaleDateString()}</td>
                                <td>{new Date(appointment.date_time).toLocaleTimeString()}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default ServiceHistory;
