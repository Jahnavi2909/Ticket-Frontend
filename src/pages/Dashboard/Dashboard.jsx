// import React from "react";
// import { useState } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar"
// import UserTable from "../../components/UserTable/UserTable";
// import SystemSettings from "../../components/SystemSettings/SystemSettings";
// import Header from "../../components/Header/Header";
// import MetricCard from "../../components/MetricCard/MetricCard";



// const DashboardPage = () => {
//   return (
//     <Layout>
//       <div className="dashboard-container">
//         {/* System Overview */}
//         <h2 className="section-title">System Overview</h2>
//         <OverviewCards />

//         {/* User Management */}
//         <div className="user-section">
//           <h3>User Management</h3>
//           <button className="add-btn">Add New User</button>
//           <UserTable />
//         </div>
//       </div>
//       <SystemSettings />
//     </Layout>
//   );
// };

// export default DashboardPage;

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
              {/* <MetricCard
                title="Current Ticket Volume"
                value="245"
                unit="Ticks"
                trend={{ type: 'up' }}
                chartData="0,25 5,20 10,22 15,18 20,15 25,20 30,17 35,22 40,19 45,16 50,20 55,15 60,18 65,14 70,17 75,20 80,16 85,19 90,15 95,18 100,14"
              />
              <MetricCard
                title="Average Resolution Time"
                value="4.2"
                unit="hours"
                trend={{ type: 'down' }}
                chartData="0,15 10,18 20,14 30,20 40,16 50,22 60,18 70,24 80,20 90,25 100,22"
              />
              <MetricCard
                title="Open Tickets Today"
                value="58"
                unit="hours"
                icon={
                  <div className="ticket-icon">
                    <Ticket size={20} />
                    <div className="closed-text">Closed Tickets<br/>Today</div>
                  </div>
                }
              /> */}

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
