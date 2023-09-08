import { useState, useEffect } from "react";

function ModelForm () {
    const [manufacturers, setManufacturers] = useState([]);
    const [name, setName] = useState('');
    const [manufacturerId, setManufacturerId] = useState('');
    const [pictureUrl, setPictureUrL] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);
    const [isErrorVisible, setIsErrorVisible] = useState(false);


    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setManufacturers(data.manufacturers);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {};

        data.name = name;
        data.manufacturer_id = manufacturerId;
        data.picture_url = pictureUrl;


        const modelUrl = 'http://localhost:8100/api/models/'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(data)

        const response = await fetch(modelUrl, fetchConfig);
        if (response.ok) {
            const newModel = await response.json();
            console.log(newModel);

            setName('');
            setManufacturerId('');
            setPictureUrL('');

            // success and error message
            setSuccessMessage('Model was created successfully!');
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

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);
    }

    const handleManufacturerChange = (e) => {
        const value = e.target.value;
        setManufacturerId(value);
    }

    const handlePictureUrlChange = (e) => {
        const value = e.target.value;
        setPictureUrL(value);
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Vehicle Model</h1>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Model name" required type="text" name="name" id="name" className="form-control" />
                            <label htmlFor="name">Model name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePictureUrlChange} value={pictureUrl} placeholder="Picture Url" required type="text" name="picture_url" id="picture_url" className="form-control" />
                            <label htmlFor="picture_url">Picture Url</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleManufacturerChange} value={manufacturerId} required name="manufacturer_id" id="manufacturer_id" className="form-select" >
                                <option defaultValue value="">Choose a manufacturer</option>
                                {manufacturers.map(manufacturer => {
                                    return (
                                        <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                                    )
                                })}
                            </select>
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


export default ModelForm;
