import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SupportPage3 from '../../pages/SupportPage3/Supportpage3'
import KnowledgeManagement3 from '../../pages/KnowledgeManagement3/KnowledgeManagement3';



const User = () => {
  const [activePage, setActivePage] = useState('tickets');
  return (
    <div>
      {activePage === 'tickets' && (
        <SupportPage3 activeTab={activePage} setActivePage={setActivePage} />
      )}

      {activePage === 'knowledge' && (
        <KnowledgeManagement3 activeTab={activePage} setActivePage={setActivePage} />
      )}
    </div>
  )
}

export default User;