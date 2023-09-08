import { useState, useEffect } from 'react';

function AppointmentList(){

    const [appointments, setAppointments] = useState([]);

    const fetchData = async () => {
        const response = await fetch ('http://localhost:8080/api/appointments/');

        if(response.ok) {
            const data = await response.json();
            const showAppointments = data.appointments.filter(appointment => appointment.status === "created")
            setAppointments(showAppointments);
        }
    }


    useEffect(() => {
        fetchData()
    }, [])


    const handleCancelAppointment = async (id) => {
        const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({"status":"canceled"}),
            headers:{
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(cancelUrl, fetchConfig);
        if(response.ok){
            console.log("appointment canceled");
            fetchData();
        }
    }

    const handleFinishAppointment = async (id) => {
        const finishUrl = `http://localhost:8080/api/appointments/${id}/cancel/`;
        const fetchConfig = {
            method: "put",
            body: JSON.stringify({"status":"finished"}),
            headers:{
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(finishUrl, fetchConfig);
        if(response.ok){
            console.log("appointment finished");
            fetchData();

        }
    }

    return (
        <>
            <h1>Service Appointments</h1>
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
                                <td>
                                    <button onClick={() => handleCancelAppointment(appointment.id)} className="btn btn-danger">Cancel</button>
                                    <button onClick={() => handleFinishAppointment(appointment.id)} className="btn btn-success">Finish</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default AppointmentList;
