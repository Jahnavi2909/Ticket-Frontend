

import React, { useState } from 'react';
import { Ticket } from 'lucide-react';
import Sidebar3  from "../../components/Sidebar3/Sidebar3";
// import Header from "../../components/Header/Header";
import MetricCard from "../../components/MetricCard/MetricCard";
import UserTable from "../../components/UserTable/UserTable";
// import SystemSettings from "../../components/SystemSettings/SystemSettings";
import Users from "../../components/Users/Users" // Import the Users component
import './Dashboard.css';

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('dashboard'); // default active item

  return (
    <div className="dashboard-container">
      <Sidebar3 activeItem={activeItem} setActiveItem={setActiveItem} />
      
      <div className="main-content">
        {/* <Header /> */}

        {/* Conditional Rendering based on activeItem */}
        {activeItem === 'dashboard' && (
          <div className="dashboard-grid">
            <div className="metrics-row">
              

              <MetricCard
                title="Current Ticket Volume"
                value=""
                unit=""
                // trend={{ type: 'up' }}
                chartData="S"
              />
              <MetricCard
                title="Average Resolution Time"
                value=""
                unit=""
                // trend={{ type: 'down' }}
                chartData=""
              />
              <MetricCard
                title="Open Tickets Today"
                value=""
                unit=""
                icon={
                  <div className="ticket-icon">
                    <Ticket size={20} />
                    {/* <div className="closed-text">Closed Tickets<br/>Today</div> */}
                  </div>
                }
              />
            </div>
            
            <UserTable />
          </div>
        )}

        {activeItem === 'Users'} {/* Render Users page */
        <Users/>}    
        {activeItem === 'Knowledgebase'}
        {activeItem === 'tickets' } {/*Placeholder for Tickets */}
        {/* {activeItem === 'settings' && <h2>Settings Page</h2>} Placeholder for Settings */}
        {/* Add more conditional pages if needed */}
      </div>
      
      {/* <SystemSettings /> */}
    </div>
  );
};

export default Dashboard;
