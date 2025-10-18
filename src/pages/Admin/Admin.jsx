import React, { useState } from 'react'; 
import SupportPage1 from '../../pages/SupportPage1/SupportPage1'; 
import KnowledgeManagement from '../../pages/KnowledgeManagement/KnowledgeManagement'; 
import UsersPage from '../../pages/UsersPage/UsersPage'; 

const Admin = () => { 
    const [activePage, setActivePage] = useState('tickets'); 
    
    return (
    <div> 
        {activePage === 'tickets' && 
        (<SupportPage1 activeTab={activePage} setActivePage={setActivePage}
         />)}


            {activePage === 'users' && (
                <UsersPage activeTab={activePage} setActiveTab={setActivePage} />)}
                
                 {activePage === 'knowledge' && (
                    <KnowledgeManagement activeTab={activePage} setActivePage={setActivePage} 
                    />)}
                     </div>) } 

export default Admin;