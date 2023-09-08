import { useState } from 'react';

function TechnicianForm() {

    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const[employeeID, setEmployeeID] = useState("")

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isSuccessVisible, setisSuccessVisible] = useState("")
    const [isErrorVisible, setisErrorVisible] = useState("")



    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeIDChange = (event) => {
        const value = event.target.value;
        setEmployeeID(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeID;

        const technicianUrl = 'http://localhost:8080/api/technicians/'
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };

        const response = await fetch(technicianUrl, fetchConfig);
        if (response.ok) {
            //const newTechnician = await response.json();
            //console.log("Technician created: ", newTechnician);

            setFirstName("");
            setLastName("");
            setEmployeeID("");

            setSuccessMessage('Technician created successfully!');
            setisSuccessVisible(true);

            setErrorMessage("");
            setisErrorVisible(false);

            setTimeout(() => {
                setisSuccessVisible(false);
                setSuccessMessage('');
            }, 1000);
        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'An error occured.';
            setErrorMessage(errorMessage);
            setisErrorVisible(true);

            setSuccessMessage('')
            setisSuccessVisible(false);

            setTimeout(() => {
                setisErrorVisible(false);
                setErrorMessage('');
            }, 1000);
        }
    }


    return(
        <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a Technician</h1>
                <form onSubmit={handleSubmit} id="create-technician-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFirstNameChange} value={firstName} placeholder="First name" required type="text" id="first-name" name="first-name" className="form-control"/>
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleLastNameChange} value={lastName} placeholder="Last name" required type="text" id="last-name" name="last-name" className="form-control"/>
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleEmployeeIDChange} value={employeeID} placeholder="Employee ID" required type="text" id="employee-id" name="employee-id" className="form-control"/>
                        <label htmlFor="employee-id">Employee ID</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    {isSuccessVisible && (
                        <div className="alert alert-success">{successMessage}</div>
                    )}
                    {isErrorVisible && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}
                </form>
            </div>
            </div>
        </div>
    )
}

export default TechnicianForm
