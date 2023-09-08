import { useEffect, useState } from 'react';

function AppointmentForm(){

    const [technician, setTechnician] = useState("");
    const [technicians, setTechnicians] = useState([]);
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("")
    const [reason, setReason] = useState("");

    const handleTechnicianChange = (event) => {
        const value = event.target.value;
        setTechnician(value);
    }

    const handleVinChange = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleCustomerChange = (event) => {
        const value = event.target.value;
        setCustomer(value);
    }

    const handleDateChange = (event) => {
        const value = event.target.value;
        setDate(value);
    }

    const handleTimeChange = (event) => {
        const value = event.target.value;
        setTime(value);
    }

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setReason(value);
    }

    const fetchData = async () => {
        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const response = await fetch(technicianUrl);

        if (response.ok) {
            const data = await response.json();

            setTechnicians(data.technicians);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.vin = vin;
        data.customer = customer;
        data.date_time = `${date} ${time}`;
        data.technician = technician;
        data.reason = reason

        const appointmentUrl = "http://localhost:8080/api/appointments/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(appointmentUrl, fetchConfig);
        if(response.ok) {
            //const newAppointment = await response.json();
            //console.log(newAppointment);

            setVin("");
            setCustomer("");
            setDate("");
            setTime("");
            setTechnician("");
            setReason("");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Service Appointment</h1>
                <form onSubmit={handleSubmit} id="create-conference-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleVinChange} value={vin} placeholder="Automobile VIN" required type="text" id="automobile-vin" name="automobile-vin" className="form-control"/>
                        <label htmlFor="automobile-vin">Automobile VIN</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleCustomerChange} value={customer} placeholder="Customer" required type="text" id="customer" name="customer" className="form-control"/>
                        <label htmlFor="customer">Customer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleDateChange} value={date} placeholder="Date" required type="date" id="date" name="date" className="form-control"/>
                        <label htmlFor="date">Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleTimeChange} value={time} placeholder="Time" required type="time" id="time" name="time" className="form-control"/>
                        <label htmlFor="time">Time</label>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="technician" className="form-label">Technician</label>
                        <select onChange={handleTechnicianChange} value={technician} required id="technician" name="technician" className="form-select">
                            <option value="">Choose a technician</option>
                            {technicians.map(technician =>{
                                return (
                                    <option key={technician.id} value={technician.employee_id}>
                                        {technician.employee_id}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleReasonChange} value={reason} placeholder="Reason" required type="text" id="reason" name="reason" className="form-control"/>
                        <label htmlFor="reason">Reason</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AppointmentForm;
