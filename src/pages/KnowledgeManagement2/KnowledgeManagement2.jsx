
//final code of knowledge base for the supportpage
import React, { useState , useEffect} from 'react';
import { Search, Edit, Trash2, X } from 'lucide-react';
import './KnowledgeManagement2.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import KnowledgeAPI from '../../services/KnowledgeAPI';

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
          <p><strong>ID:</strong> {article.id}</p>
          <p><strong>Category:</strong> {article.category}</p>
          <p><strong>Created At:</strong> {article.createdAt}</p>
          <p><strong>Updated At:</strong> {article.updatedAt}</p>
          <hr />
          <p>{article.content}</p>
        </div>
      </div>
    </div>
  );
};

// ---------------- Article Table ----------------
const ArticleTable = ({ articles, onEdit, onDelete, onPreview, searchQuery }) => {
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
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);


   // Handle clicking on page numbers
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="kb-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>CONTENT</th>
              <th>CATEGORY</th>
              <th>CREATED AT</th>
              <th>UPDATED AT</th>
              {/* <th>ACTIONS</th> */}
            </tr>
          </thead>
          <tbody>
            {paginatedArticles.map((article, index) => (
              <tr key={article.id} onClick={() => onPreview(article)} style={{ cursor: 'pointer' }}>
                <td>{startIndex + index + 1}</td>
                <td>{article.title}</td>
                <td>{article.content}</td>
                <td>{article.category}</td>
                <td>{article.createdAt}</td>
                <td>{article.updatedAt}</td>
                {/* <td>
                  <div className="action-buttons">
                    <button onClick={() => onEdit(article)} className="btn-edit">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(article.id)} className="btn-delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            &lt;&lt; Previous
          </button>

          <div className="pagination-numbers">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="pagination-btn"
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
 const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewArticle, setPreviewArticle] = useState(null);

  // const handleEdit = (article) => {
  //   alert(`Edit functionality for ${article.title} is not implemented`);
  // };

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this article?')) {
  //     setArticles(articles.filter((a) => a.id !== id));
  //   }
  // };

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await KnowledgeAPI.getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);


  return (
    <div className="tickets-page">
      <Sidebar activeTab={activePage} setActiveTab={setActivePage} />
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Knowledge Management</h1>
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

        {loading ? (
          <div className="loading">Loading articles...</div>
        ) : (
          <ArticleTable
            articles={articles}
            onPreview={(article) => setPreviewArticle(article)}
            searchQuery={searchQuery}
          />
        )}

        {previewArticle && (
          <ArticlePreview
            article={previewArticle}
            onClose={() => setPreviewArticle(null)}
          />
        )}
      </div>
    </div>
  );
};

export default KnowledgeManagement;




//modern code in dynamic
// import React, { useState, useEffect } from "react";
// import { Search, Edit, Trash2, Plus, X, Save } from "lucide-react";
// import Sidebar2 from "../../components/Sidebar2/Sidebar2";
// import KnowledgeAPI from "../../services/KnowledgeAPI";
// import './Knowledge.css';

// // ---------------- Article Preview Modal ----------------
// const ArticlePreview = ({ article, onClose }) => {
//   if (!article) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="close-btn" onClick={onClose}>
//           <X size={18} />
//         </button>
//         <h2>{article.title}</h2>
//         <p>{article.content}</p>
//       </div>
//     </div>
//   );
// };

// // ---------------- Article Editor Modal ----------------
// const ArticleEditor = ({ article, onSave, onClose }) => {
//   const [title, setTitle] = useState(article ? article.title : "");
//   const [content, setContent] = useState(article ? article.content : "");
//   const isEdit = !!article;

//   const handleSubmit = async () => {
//     if (!title.trim() || !content.trim()) {
//       alert("Please fill all fields.");
//       return;
//     }

//     try {
//       const articleData = { title, content };
//       await onSave(articleData, article ? article.id : null);
//       onClose();
//     } catch (err) {
//       console.error("Error saving article:", err);
//       alert("Failed to save article.");
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h2>{isEdit ? "Edit Article" : "Add New Article"}</h2>

//         <input
//           type="text"
//           placeholder="Enter title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />

//         <textarea
//           placeholder="Enter content"
//           rows="10"
//           value={content}
//           onChange={(e) => setContent(e.target.value)}
//         ></textarea>

//         <div className="modal-actions">
//           <button onClick={onClose}>
//             <X size={16} /> Cancel
//           </button>
//           <button onClick={handleSubmit}>
//             <Save size={16} /> Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------------- Main Knowledge Management Page ----------------
// const KnowledgeManagement2 = () => {
//   const [articles, setArticles] = useState([]);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedArticle, setSelectedArticle] = useState(null);
//   const [editingArticle, setEditingArticle] = useState(null);
//   const [showEditor, setShowEditor] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch articles dynamically
//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     try {
//       setLoading(true);
//       const data = await KnowledgeAPI.getAllArticles(); // GET /api/kb/gtallkb
//       setArticles(data);
//       setFilteredArticles(data);
//     } catch (err) {
//       console.error("Error fetching articles:", err);
//       alert("Failed to load knowledge base articles.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Filter articles based on search query
//   useEffect(() => {
//     if (!searchQuery.trim()) {
//       setFilteredArticles(articles);
//     } else {
//       const filtered = articles.filter((a) =>
//         a.title.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredArticles(filtered);
//     }
//   }, [searchQuery, articles]);

//   // ✅ Add or Update article
//   const handleSaveArticle = async (articleData, articleId) => {
//     try {
//       if (articleId) {
//         // Update existing article
//         await KnowledgeAPI.updateArticle(articleId, articleData);
//         alert("Article updated successfully!");
//       } else {
//         // Add new article
//         await KnowledgeAPI.addArticle(articleData);
//         alert("Article added successfully!");
//       }
//       fetchArticles();
//     } catch (err) {
//       console.error("Error saving article:", err);
//       alert("Failed to save article.");
//     }
//   };

//   // ✅ Delete article
//   const handleDeleteArticle = async (articleId) => {
//     if (!window.confirm("Are you sure you want to delete this article?")) return;
//     try {
//       await KnowledgeAPI.deleteArticle(articleId);
//       setArticles(articles.filter((a) => a.id !== articleId));
//       setFilteredArticles(filteredArticles.filter((a) => a.id !== articleId));
//       alert("Article deleted successfully!");
//     } catch (err) {
//       console.error("Error deleting article:", err);
//       alert("Failed to delete article.");
//     }
//   };

//   return (
//     <div className="knowledge-page">
//       <Sidebar2 />

//       <div className="knowledge-content">
//         <div className="knowledge-header">
//           <h2>Knowledge Base</h2>

//           <div className="knowledge-actions">
//             <div className="search-bar">
//               <Search size={18} />
//               <input
//                 type="text"
//                 placeholder="Search articles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>

//             <button className="add-btn" onClick={() => { setEditingArticle(null); setShowEditor(true); }}>
//               <Plus size={18} /> Add Article
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="loading">Loading articles...</div>
//         ) : (
//           <table className="knowledge-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Title</th>
//                 <th>Created At</th>
//                 <th>Updated At</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredArticles.length > 0 ? (
//                 filteredArticles.map((article) => (
//                   <tr key={article.id}>
//                     <td>{article.id}</td>
//                     <td
//                       className="article-title"
//                       onClick={() => setSelectedArticle(article)}
//                     >
//                       {article.title}
//                     </td>
//                     <td>{new Date(article.created_at).toLocaleString()}</td>
//                     <td>{new Date(article.updated_at).toLocaleString()}</td>
//                     <td className="actions">
//                       <button
//                         onClick={() => {
//                           setEditingArticle(article);
//                           setShowEditor(true);
//                         }}
//                       >
//                         <Edit size={16} />
//                       </button>
//                       <button onClick={() => handleDeleteArticle(article.id)}>
//                         <Trash2 size={16} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" style={{ textAlign: "center" }}>
//                     No articles found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Article Preview Modal */}
//       {selectedArticle && (
//         <ArticlePreview
//           article={selectedArticle}
//           onClose={() => setSelectedArticle(null)}
//         />
//       )}

//       {/* Article Editor Modal */}
//       {showEditor && (
//         <ArticleEditor
//           article={editingArticle}
//           onSave={handleSaveArticle}
//           onClose={() => setShowEditor(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default KnowledgeManagement2;










//no preview functionlity and edit functionality
// import React, { useState } from 'react';
// import { Search, Edit, Trash2 } from 'lucide-react';
// import './KnowledgeManagement2.css';
// import Sidebar2 from '../../components/Sidebar2/Sidebar2';

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

//   const handleEdit = (article) => {
//     alert(`Edit functionality for ${article.title} is not implemented`);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this article?')) {
//       setArticles(articles.filter((a) => a.id !== id));
//     }
//   };

//   return (
//     <div className="tickets-page">
//       <Sidebar2 activeTab={activePage} setActiveTab={setActivePage} />
//       <div className="main-content">
//         <div className="header">
//           <h1 className="page-title">Knowledge Base</h1>
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
//       </div>
//     </div>
//   );
// };

// export default KnowledgeManagement;



