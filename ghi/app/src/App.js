import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import TechnicianList from './TechnicianList';
import TechnicianForm from './CreateTechnician';
import CustomersList from './CustomersList';
import CustomerForm from './CustomerForm';
import AppointmentForm from './CreateAppointment';
import AppointmentList from './AppointmentList';
import ServiceHistory from './ServiceHistory';
import SalesList from './SalesList';
import SaleForm from './SaleForm';
import SalehistoryList from './SalehistoryList';
import ModelList from './ModelList';
import ModelForm from './ModelForm';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import AutomobileList from './AutomobileList';
import CreateAuto from './CreateAuto';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople">
            <Route index element={<SalespeopleList />} />
            <Route path="create" element={<SalespersonForm />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomersList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="create" element={<SaleForm />} />
            <Route path="history" element={<SalehistoryList />} />
          </Route>
          <Route path="technicians">
            <Route index element={<TechnicianList/>} />
            <Route path="create" element={<TechnicianForm/>} />
          </Route>
          <Route path="appointments">
            <Route index element={<AppointmentList/>} />
            <Route path="create" element={<AppointmentForm/>} />
            <Route path="history" element={<ServiceHistory/>} />
          </Route>
          <Route path="models">
            <Route index element={<ModelList />} />
            <Route path="create" element={<ModelForm />} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturerList/>} />
            <Route path="create" element={<ManufacturerForm/>} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList/>} />
            <Route path="create" element={<CreateAuto/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
