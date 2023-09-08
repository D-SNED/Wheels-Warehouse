import { useState, useEffect } from "react";

function SaleForm () {
    const [autos, setAutos] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customers, setCustomers] = useState([])
    const [automobile, setAutomobile] = useState('')
    const [salesperson, setSalesperson] = useState('')
    const [customer, setCustomer] = useState('')
    const [price, setPrice] = useState('')

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false);


    const fetchAutos = async () => {
        const url = `http://localhost:8100/api/automobiles/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            // const showUnsold = data.autos.filter(auto => auto.sold === "false")
            setAutos(data.autos);
            console.log(data)
        }

    }

    const fetchSalespeople = async () => {
        const url = `http://localhost:8090/api/salespeople/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    }

    const fetchCustomers = async () => {
        const url = `http://localhost:8090/api/customers/`;
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    }

    useEffect(() => {
        fetchAutos();
        fetchSalespeople();
        fetchCustomers();
    }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedAuto = autos.find(auto => auto.vin === automobile);
        if (!selectedAuto || selectedAuto.sold !== "unsold") {
            setErrorMessage('Selected automobile is not available for sale.');
            setIsErrorVisible(true);
            return;
        }

        const data = {};

        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;

        const saleUrl = 'http://localhost:8090/api/sales/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const newSale = await response.json();
            console.log(newSale);

            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');

            // success and error message
            setSuccessMessage('Sale was recorded successfully!');
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

    const handleAutomobileChange = (e) => {
        const value = e.target.value;
        setAutomobile(value);
    }

    const handleSalespersonChange = (e) => {
        const value = e.target.value;
        setSalesperson(value);
    }

    const handleCustomerChange = (e) => {
        const value = e.target.value;
        setCustomer(value);
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPrice(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create-sale-form">
                    <label htmlFor="automobile">Automobile</label>
                    <div className="form-floating mb-3">
                            <select onChange={handleAutomobileChange} value={automobile} required name="automobile" id="automobile" className="form-select" >
                                <option defaultValue value="">Choose an Automobile VIN</option>
                                {autos
                                    // .filter(auto => auto.sold === "false")
                                    .map(auto => {
                                        return (
                                            <option key={auto.vin} value={auto.vin}>{auto.vin}</option>
                                        )
                                    })}
                            </select>
                        </div>
                        <label htmlFor="salesperson">Salesperson</label>
                        <div className="mb-3">
                            <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select" >
                                <option defaultValue value="">Choose a salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <label htmlFor="customer">Customer</label>
                        <div className="mb-3">
                            <select onChange={handleCustomerChange} value={customer} required name="customer" id="customer" className="form-select" >
                                <option defaultValue value="">Choose a customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <label htmlFor="price">Price</label>
                        <div className="mb-3">
                            <input onChange={handlePriceChange} value={price} placeholder="Price" required type="text" name="price" id="price" className="form-control" />
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


export default SaleForm;
