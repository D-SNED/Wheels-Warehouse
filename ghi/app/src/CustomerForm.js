import { useState } from "react";

function CustomerForm () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;

        console.log(data);

        const customerUrl = 'http://localhost:8090/api/customers/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);

            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');

            // success and error message
            setSuccessMessage('Customer created successfully!');
            setIsSuccessVisible(true);

            setErrorMessage('');
            setIsErrorVisible(false);

            setTimeout(() => {
                setIsSuccessVisible(false);
                setSuccessMessage('');
            }, 1000);

        } else {
            const errorData = await response.json();
            const errorMessage = errorData.message || 'An error occurred.';
            setErrorMessage(errorMessage);
            setIsErrorVisible(true);

            setSuccessMessage('');
            setIsSuccessVisible(false);

            setTimeout(() => {
                setIsErrorVisible(false);
                setErrorMessage('');
            }, 1000);

        }

    }

    const handleFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const handleAddressChange = (e) => {
        const value = e.target.value;
        setAddress(value);
    }

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        setPhoneNumber(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Customer</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleFirstNameChange} value={firstName} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleLastNameChange} value={lastName} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleAddressChange} value={address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePhoneNumberChange} value={phoneNumber} placeholder="Phone number" required type="text" name="phone_number" id="phone_number" className="form-control" />
                            <label htmlFor="phone_number">Phone number</label>
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
    );
}


export default CustomerForm;
