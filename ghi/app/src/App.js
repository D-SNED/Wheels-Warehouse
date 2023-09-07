import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespeopleList from './SalespeopleList';
import SalespersonForm from './SalespersonForm';
import TechnicianList from './TechnicianList';
import CustomersList from './CustomersList';
import CustomerForm from './CustomerForm';

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
          <Route path="technicians">
            <Route index element={<TechnicianList/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
