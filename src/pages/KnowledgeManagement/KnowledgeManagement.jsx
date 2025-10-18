// import React, { useState } from 'react';
// import { Search, Plus, Edit, Trash2, X, Save } from 'lucide-react';
// import './KnowledgeManagement.css';
// import Sidebar2 from '../../components/Sidebar2/Sidebar2';

// // ---------------- Article Form ----------------
// const ArticleForm = ({ article, onSave, onCancel }) => {
//   const [formData, setFormData] = useState({
//     title: article?.title || '',
//     content: article?.content || '',
//     category: article?.category || 'Technical Support'
//   });

//   const categories = ['Technical Support', 'Billing', 'Getting Started', 'Developer'];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal-container">
//         <div className="modal-header">
//           <h2 className="modal-title">{article ? 'Edit Article' : 'New Article'}</h2>
//           <button onClick={onCancel} className="close-button">
//             <X size={24} />
//           </button>
//         </div>

//         <div className="modal-body">
//           <div className="form-group">
//             <label className="form-label">Title</label>
//             <input
//               type="text"
//               required
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               className="form-input"
//               placeholder="Enter article title"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Content</label>
//             <textarea
//               required
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               rows={8}
//               className="form-textarea"
//               placeholder="Enter article content"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label">Category</label>
//             <select
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               className="form-select"
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-actions">
//             <button type="button" onClick={onCancel} className="btn btn-cancel">
//               Cancel
//             </button>
//             <button type="button" onClick={handleSubmit} className="btn btn-primary">
//               <Save size={18} />
//               Save Article
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------------- Article Table ----------------
// const ArticleTable = ({ articles, onEdit, onDelete, searchQuery }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const filteredArticles = articles.filter(
//     (article) =>
//       article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       article.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="table-container">
//       <div className="table-wrapper">
//         <table className="kb-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>TITLE</th>
//               <th>CONTENT</th>
//               <th>CATEGORY</th>
//               <th>CREATED AT</th>
//               <th>UPDATED AT</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedArticles.map((article, index) => (
//               <tr key={article.id}>
//                 <td>{startIndex + index + 1}</td>
//                 <td className="td-title">{article.id}</td>
//                 <td>
//                   <div className="content-title">{article.title}</div>
//                   <div className="content-desc">{article.content}</div>
//                 </td>
//                 <td>{article.category}</td>
//                 <td>{article.createdAt}</td>
//                 <td>{article.updatedAt}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button onClick={() => onEdit(article)} className="btn-edit">
//                       <Edit size={18} />
//                     </button>
//                     <button onClick={() => onDelete(article.id)} className="btn-delete">
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="pagination-btn"
//           >
//             &lt;&lt; Previous
//           </button>

//           <div className="pagination-numbers">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="pagination-btn"
//           >
//             Next &gt;&gt;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------------- Main Knowledge Page ----------------
// const KnowledgeManagement = ({ activePage, setActivePage }) => {
//   const [articles, setArticles] = useState([
//     {
//       id: 'KB-001',
//       title: 'Troubleshooting Login Issues',
//       content: 'Steps to resolve common user login problems...',
//       category: 'Technical Support',
//       createdAt: '2023-10-26',
//       updatedAt: '2023-11-01'
//     },
//     {
//       id: 'KB-002',
//       title: 'Frequently asked questions about payments...',
//       content: 'Frequently asked questions about payments...',
//       category: 'Billing',
//       createdAt: '2023-10-27',
//       updatedAt: '2023-11-07'
//     },
//     {
//       id: 'KB-003',
//       title: 'Billing & Subscription FAQs for new users...',
//       content: 'Billing & Subscription FAQs for new users...',
//       category: 'Billing',
//       createdAt: '2023-10-27',
//       updatedAt: '2023-11-05'
//     },
//     {
//       id: 'KB-004',
//       title: 'Product Onboarding Guide',
//       content: 'Documentation for integrating with our API',
//       category: 'Getting Started',
//       createdAt: '2023-10-28',
//       updatedAt: '2023-11-05'
//     },
//     {
//       id: 'KB-005',
//       title: 'API Integration Docs',
//       content: 'API Integration Docs',
//       category: 'Developer',
//       createdAt: '2023-10-30',
//       updatedAt: '2023-11-03'
//     }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [showForm, setShowForm] = useState(false);
//   const [editingArticle, setEditingArticle] = useState(null);

//   const handleSaveArticle = (formData) => {
//     if (editingArticle) {
//       const updated = {
//         ...editingArticle,
//         ...formData,
//         updatedAt: new Date().toISOString().split('T')[0]
//       };
//       setArticles(articles.map((a) => (a.id === editingArticle.id ? updated : a)));
//     } else {
//       const newArticle = {
//         id: `KB-${String(articles.length + 1).padStart(3, '0')}`,
//         ...formData,
//         createdAt: new Date().toISOString().split('T')[0],
//         updatedAt: new Date().toISOString().split('T')[0]
//       };
//       setArticles([...articles, newArticle]);
//     }
//     setShowForm(false);
//     setEditingArticle(null);
//   };

//   const handleEdit = (article) => {
//     setEditingArticle(article);
//     setShowForm(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       setArticles(articles.filter((a) => a.id !== id));
//     }
//   };

//   const handleNewArticle = () => {
//     setEditingArticle(null);
//     setShowForm(true);
//   };

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />
//       <div className="main-content">
//         <div className="header">
//           <h1 className="page-title">Knowledge Management</h1>
//           <button onClick={handleNewArticle} className="btn btn-new">
//             <Plus size={20} />
//             New Article
//           </button>
//         </div>

//         <div className="search-section">
//           <div className="search-wrapper">
//             <Search className="search-icon" size={20} />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search articles..."
//               className="search-input"
//             />
//           </div>
//         </div>

//         <ArticleTable
//           articles={articles}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           searchQuery={searchQuery}
//         />

//         {showForm && (
//           <ArticleForm
//             article={editingArticle}
//             onSave={handleSaveArticle}
//             onCancel={() => {
//               setShowForm(false);
//               setEditingArticle(null);
//             }}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default KnowledgeManagement;

// code with edit  functionality and preview functionality
// import React, { useState, useEffect } from 'react';
// import { Search, Edit, Trash2, X , Save,Plus} from 'lucide-react';
// import './KnowledgeManagement.css';
// import Sidebar3 from '../../components/Sidebar3/Sidebar3';
// import KnowledgeAPI from '../../services/KnowledgeAPI';

// // ---------------- Article Preview Modal ----------------
// const ArticlePreview = ({ article, onClose }) => {
//   if (!article) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>{article.title}</h2>
//           <button onClick={onClose} className="close-button">
//             <X size={24} />
//           </button>
//         </div>
//         <div className="modal-body">
//           <p><strong>ID:</strong> {article.id}</p>
//           <p><strong>Category:</strong> {article.category}</p>
//           <p><strong>Created At:</strong> {article.createdAt}</p>
//           <p><strong>Updated At:</strong> {article.updatedAt}</p>
//           <hr />
//           <p>{article.content}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------------- Article Edit Modal ----------------
// const ArticleEditForm = ({ article, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     title: article.title,
//     content: article.content,
//     category: article.category
//   });

//   const categories = ['Technical Support', 'Billing', 'Getting Started', 'Developer'];

//   const handleSubmit = async () => {
//     try {
//       // Call update API
//       const response = await fetch('/api/kb/updkb', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ id: article.id, ...formData })
//       });

//       if (!response.ok) throw new Error('Failed to update article');

//       const updatedArticle = await response.json();
//       onSave(updatedArticle);
//       onClose();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>Edit Article</h2>
//           <button onClick={onClose} className="close-button">
//             <X size={24} />
//           </button>
//         </div>
//         <div className="modal-body">
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//             />
//           </div>
//           <div className="form-group">
//             <label>Content</label>
//             <textarea
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//               rows={6}
//             />
//           </div>
//           <div className="form-group">
//             <label>Category</label>
//             <select
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//           </div>
//           <div className="form-actions">
//             <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
//             <button className="btn btn-primary" onClick={handleSubmit}>
//               <Save size={18} /> Save
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------------- New Article Form ----------------
// const NewArticleForm = ({ onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     category: 'Technical Support'
//   });

//   const categories = ['Technical Support', 'Billing', 'Getting Started', 'Developer'];

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('/api/kb/addkb', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) throw new Error('Failed to create article');
//       const newArticle = await response.json();
//       onSave(newArticle);
//       onClose();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h2>New Article</h2>
//           <button onClick={onClose} className="close-button"><X size={24} /></button>
//         </div>
//         <div className="modal-body">
//           <div className="form-group">
//             <label>Title</label>
//             <input type="text" placeholder="Enter article title"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
//           </div>
//           <div className="form-group">
//             <label>Content</label>
//             <textarea rows={6} placeholder="Enter article content"
//               value={formData.content}
//               onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
//           </div>
//           <div className="form-group">
//             <label>Category</label>
//             <select value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
//               {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
//             </select>
//           </div>
//           <div className="form-actions">
//             <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
//             <button className="btn btn-primary" onClick={handleSubmit}>
//               <Save size={18} /> Create
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------------- Article Table ----------------
// const ArticleTable = ({ articles, onEdit, onDelete, onPreview, searchQuery }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const filteredArticles = articles.filter(
//     (article) =>
//       article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       article.id.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div className="table-container">
//       <div className="table-wrapper">
//         <table className="kb-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>TITLE</th>
//               <th>CONTENT</th>
//               <th>CATEGORY</th>
//               <th>CREATED AT</th>
//               <th>UPDATED AT</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedArticles.map((article, index) => (
//               <tr key={article.id}>
//                 <td onClick={() => onPreview(article)}>{startIndex + index + 1}</td>
//                 <td className="td-title" onClick={() => onPreview(article)}>{article.id}</td>
//                 <td onClick={() => onPreview(article)}>
//                   <div className="content-title">{article.title}</div>
//                   <div className="content-desc">{article.content}</div>
//                 </td>
//                 <td onClick={() => onPreview(article)}>{article.category}</td>
//                 <td onClick={() => onPreview(article)}>{article.createdAt}</td>
//                 <td onClick={() => onPreview(article)}>{article.updatedAt}</td>
//                 <td>
//                   <div className="action-buttons">
//                     <button onClick={() => onEdit(article)} className="btn-edit">
//                       <Edit size={18} />
//                     </button>
//                     <button onClick={() => onDelete(article.id)} className="btn-delete">
//                       <Trash2 size={18} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="pagination-btn"
//           >
//             &lt;&lt; Previous
//           </button>

//           <div className="pagination-numbers">
//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
//               >
//                 {i + 1}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="pagination-btn"
//           >
//             Next &gt;&gt;
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// // ---------------- Main Knowledge Page ----------------
// const KnowledgeManagement = ({ activePage, setActivePage }) => {
//   const [articles, setArticles] = useState([
//     {
//       id: 'KB-001',
//       title: 'Troubleshooting Login Issues',
//       content: 'Steps to resolve common user login problems...',
//       category: 'Technical Support',
//       createdAt: '2023-10-26',
//       updatedAt: '2023-11-01'
//     },
//     {
//       id: 'KB-002',
//       title: 'Frequently asked questions about payments...',
//       content: 'Frequently asked questions about payments...',
//       category: 'Billing',
//       createdAt: '2023-10-27',
//       updatedAt: '2023-11-07'
//     },
//     {
//       id: 'KB-003',
//       title: 'Billing & Subscription FAQs for new users...',
//       content: 'Billing & Subscription FAQs for new users...',
//       category: 'Billing',
//       createdAt: '2023-10-27',
//       updatedAt: '2023-11-05'
//     },
//     {
//       id: 'KB-004',
//       title: 'Product Onboarding Guide',
//       content: 'Documentation for integrating with our API',
//       category: 'Getting Started',
//       createdAt: '2023-10-28',
//       updatedAt: '2023-11-05'
//     },
//     {
//       id: 'KB-005',
//       title: 'API Integration Docs',
//       content: 'API Integration Docs',
//       category: 'Developer',
//       createdAt: '2023-10-30',
//       updatedAt: '2023-11-03'
//     }
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [previewArticle, setPreviewArticle] = useState(null);
//   const [editArticle, setEditArticle] = useState(null);
//    const [showNewForm, setShowNewForm] = useState(false);

//     // Fetch all articles on mount
//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         const res = await fetch('/api/kb/gtallkb');
//         const data = await res.json();
//         setArticles(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchArticles();
//   }, []);

//  const handleEdit = (article) => setEditArticle(article);
//   const handleSaveEdit = (updatedArticle) => {
//     setArticles(articles.map((a) => (a.id === updatedArticle.id ? updatedArticle : a)));
//   };

//  const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this article?')) return;
//     try {
//       await fetch(`/api/kb/gtkbid/${id}`, { method: 'DELETE' });
//       setArticles(articles.filter((a) => a.id !== id));
//     } catch (err) {
//       alert('Failed to delete article');
//     }
//   };

//    const handleSaveNew = (newArticle) => {
//     setArticles([...articles, newArticle]);
//   };

//   return (
//     <div className="tickets-page">
//       <Sidebar3 activeTab={activePage} setActiveTab={setActivePage} />
//       <div className="main-content">
//         <div className="header">
//           <h1 className="page-title">Knowledge Base</h1>
//           <button onClick={() => setShowNewForm(true)} className="btn btn-new">
//             <Plus size={20} /> New Article
//           </button>

//         </div>

//         <div className="search-section">
//           <div className="search-wrapper">
//             <Search className="search-icon" size={20} />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search articles..."
//               className="search-input"
//             />
//           </div>
//         </div>

//         <ArticleTable
//           articles={articles}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//           onPreview={(article) => setPreviewArticle(article)}
//           searchQuery={searchQuery}
//         />

//         {previewArticle && (
//           <ArticlePreview
//             article={previewArticle}
//             onClose={() => setPreviewArticle(null)}
//           />
//         )}

//                 {editArticle && (
//           <ArticleEditForm
//             article={editArticle}
//             onClose={() => setEditArticle(null)}
//             onSave={handleSaveEdit}
//           />
//         )}

//         {showNewForm &&
//         <NewArticleForm
//         onClose={() => setShowNewForm(false)} onSave={handleSaveNew

//         } />}

//       </div>
//     </div>
//   );
// };

// export default KnowledgeManagement;

//code which is taken from support file
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { Search, Edit, Trash2, X, Save, Plus } from "lucide-react";
import "./KnowledgeManagement.css";
import Sidebar3 from "../../components/Sidebar3/Sidebar3";
import KnowledgeAPI from "../../services/KnowledgeAPI";


dayjs.extend(utc);
dayjs.extend(timezone);

// ---------------- Article Preview Modal ----------------
const ArticlePreview = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{article.title}</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <p>
            <strong>ID:</strong> {article.id}
          </p>
          <p>
            <strong>Category:</strong> {article.category}
          </p>
          <p>
            <strong>Created At:</strong> {dayjs(article.createdAt).format('DD-MMM-YYYY HH:mm:ss')}
          </p>
          <p>
            <strong>Updated At:</strong> {dayjs(article.updatedAt).format('DD-MMM-YYYY HH:mm:ss')}
          </p>
          <hr />
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
};

// ---------------- Article Edit Modal ----------------
const ArticleEditForm = ({ article, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: article.title,
    content: article.content,
    category: article.category,
  });

  const categories = [
    "Technical Support",
    "Billing",
    "Getting Started",
    "Developer",
  ];

  const handleSubmit = async () => {
    try {
      const updatedArticle = await KnowledgeAPI.updateArticle({
        id: article.id,
        ...formData,
      });
      onSave(updatedArticle);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Article</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={6}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              <Save size={18} /> Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- New Article Form ----------------
const NewArticleForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Technical Support",
  });

  const categories = [
    "Technical Support",
    "Billing",
    "Getting Started",
    "Developer",
  ];

  const handleSubmit = async () => {
    try {
      const newArticle = await KnowledgeAPI.addArticle(formData);
      onSave(newArticle);
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>New Article</h2>
          <button onClick={onClose} className="close-button">
            <X size={24} />
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter article title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              rows={6}
              placeholder="Enter article content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <button className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              <Save size={18} /> Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------- Article Table ----------------
const ArticleTable = ({
  articles,
  onEdit,
  onDelete,
  onPreview,
  searchQuery,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="table-container">
      <table className="kb-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>CONTENT</th>
            <th>CATEGORY</th>
            <th>CREATED AT</th>
            <th>UPDATED AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {paginatedArticles.map((article, index) => (
            <tr key={article.id}>
              <td onClick={() => onPreview(article)}>
                {startIndex + index + 1}
              </td>
              <td className="td-title" onClick={() => onPreview(article)}>
                {article.id}
              </td>
              <td onClick={() => onPreview(article)}>
                <div className="content-title">{article.title}</div>
                <div className="content-desc">{article.content}</div>
              </td>
              <td onClick={() => onPreview(article)}>{article.category}</td>
              <td onClick={() => onPreview(article)}>
                {dayjs(article.createdAt).utc().tz("Asia/Kolkata").format("DD-MMM-YYYY HH:mm:ss")}
              </td>
              <td onClick={() => onPreview(article)}>
                {dayjs(article.updatedAt).utc().tz("Asia/Kolkata").format("DD-MMM-YYYY HH:mm:ss")}
              </td>
              <td>
                <div className="action-buttons">
                  <button onClick={() => onEdit(article)} className="btn-edit">
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(article.id)}
                    className="btn-delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            &lt;&lt; Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
};

// ---------------- Main Knowledge Page ----------------
const KnowledgeManagement = ({ activePage, setActivePage }) => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewArticle, setPreviewArticle] = useState(null);
  const [editArticle, setEditArticle] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  // Fetch all articles from API
  const fetchArticles = async () => {
    try {
      const data = await KnowledgeAPI.getAllArticles();
      setArticles(data);
    } catch (err) {
      console.error("Error fetching articles:", err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleEdit = (article) => setEditArticle(article);
  const handleSaveEdit = (updatedArticle) => {
    setArticles(
      articles.map((a) => (a.id === updatedArticle.id ? updatedArticle : a))
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?"))
      return;
    try {
      await KnowledgeAPI.deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (err) {
      alert("Failed to delete article");
    }
  };

  const handleSaveNew = (newArticle) => {
    setArticles([...articles, newArticle]);
  };

  return (
    <div className="tickets-page">
      <Sidebar3 activeTab={activePage} setActiveTab={setActivePage} />
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Knowledge Base</h1>
          <button onClick={() => setShowNewForm(true)} className="btn btn-new">
            <Plus size={20} /> New Article
          </button>
        </div>

        <div className="search-section">
          <div className="search-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="search-input"
            />
          </div>
        </div>

        <ArticleTable
          articles={articles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPreview={(article) => setPreviewArticle(article)}
          searchQuery={searchQuery}
        />

        {previewArticle && (
          <ArticlePreview
            article={previewArticle}
            onClose={() => setPreviewArticle(null)}
          />
        )}

        {editArticle && (
          <ArticleEditForm
            article={editArticle}
            onClose={() => setEditArticle(null)}
            onSave={handleSaveEdit}
          />
        )}

        {showNewForm && (
          <NewArticleForm
            onClose={() => setShowNewForm(false)}
            onSave={handleSaveNew}
          />
        )}
      </div>
    </div>
  );
};

export default KnowledgeManagement;
