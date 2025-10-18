import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SupportPage from '../../pages/SupportPage/SupportPage';
import KnowledgeManagement2 from '../../pages/KnowledgeManagement2/KnowledgeManagement2';


const Agent = () => {
  const [activePage, setActivePage] = useState('tickets');
  return (
    <div>
      {activePage === 'tickets' && (
        <SupportPage activeTab={activePage} setActivePage={setActivePage} />
      )}
      {activePage === 'knowledge' && (
        <KnowledgeManagement2 activeTab={activePage} setActivePage={setActivePage} />
      )}
    </div>
  )
}

export default Agent;