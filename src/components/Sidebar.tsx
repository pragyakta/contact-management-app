import React from 'react';
import {Link} from 'react-router-dom';


const Sidebar: React.FC = () => {
    return(
        <div className="bg-gray-300 p-4 h-screen">
            <Link to="/" className="block py-2 px-4 hover:bg-gray-400">Contact Page</Link>
            <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-400">Dashboard</Link>
        </div>
    );
};
export default Sidebar;