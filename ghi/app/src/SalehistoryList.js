import { useEffect, useState } from "react";

function SalehistoryList() {
    const [sales, setSales] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [salespeople, setSalespeople] = useState([]);

    useEffect(()=>{
        const getSales = async () => {
            const response = await fetch('http://localhost:8090/api/sales/');

            if (response.ok) {
                const data = await response.json();
                setSales(data.sales)
            }
        }

        const getSalespeople = async () => {
            const response = await fetch('http://localhost:8090/api/salespeople/');

            if (response.ok) {
                const data = await response.json();
                setSalespeople(data.salespeople)
            }
        }

        getSales();
        getSalespeople();
    }, [])


    const handleChooseSalesperson = (event) => {
        setSalesperson(event.target.value);
      };


    return (
        <div>
            <div>
            <h1>Salesperson History</h1>
            </div>
            <div className="mb-3">
                <select onChange={handleChooseSalesperson} required name="salesperson" id="salesperson" className="form-select" >
                    <option defaultValue value="">Select a salesperson</option>
                    {salespeople.map(salesperson => {
                        return (
                            <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>
                        )
                    })}
                </select>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Salesperson Name</th>
                        <th>Customer</th>
                        <th>Vin</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales
                        .filter((sale) => {
                            // Checks for sale's salesperson id to match the selected salesperson
                            return sale.salesperson.id === parseInt(salesperson, 10);
                        })
                        .map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{ sale.salesperson.first_name } { sale.salesperson.last_name }</td>
                                    <td>{ sale.customer.first_name } { sale.customer.last_name }</td>
                                    <td>{ sale.automobile.vin }</td>
                                    <td>{ sale.price }</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default SalehistoryList;
