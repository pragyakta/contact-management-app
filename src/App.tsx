import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactPage from './pages/ContactPage';
import DashboardPage from './pages/DashboardPage';
import ContactDetail from './pages/contact-detail/ContactDetail'; 
import Sidebar from './components/Sidebar';
import ContactList from './components/ContactList';

const App: React.FC = () => {
  return (
    
    <Router>
      <div className="h-screen flex">
        <div className="w-1/4 p-4 bg-gray-200">
          <Sidebar /> 
        </div>
        <div className="w-3/4 flex flex-col">
          <div className="flex-grow p-8 bg-white shadow-md">
            <Routes>
              <Route path="/" element={<ContactPage />} />
              
            </Routes>
          </div>
          {/*<div className="p-8 bg-white shadow-md">
            <ContactList/>
  </div>*/}
        </div>
      </div>
    </Router>
  );
};

export default App;
