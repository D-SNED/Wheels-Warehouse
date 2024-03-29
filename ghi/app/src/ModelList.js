import { useEffect, useState } from "react";

function ModelList() {
    const [models, setModels] = useState([])

    useEffect(()=>{
        const getData = async () => {
            const response = await fetch('http://localhost:8100/api/models/');

            if (response.ok) {
                const data = await response.json();
                setModels(data.models)
            }
        }
        getData()
    }, [])

    return (
        <div>
            <div>
            <h1>Models</h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Manufacturer</th>
                        <th>Picture</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => {
                        return (
                            <tr key={model.id}>
                                <td>{ model.name }</td>
                                <td>{ model.manufacturer.name }</td>
                                <td> <img src={model.picture_url} alt="vehicle" style={{ width: '200px'}} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ModelList;
