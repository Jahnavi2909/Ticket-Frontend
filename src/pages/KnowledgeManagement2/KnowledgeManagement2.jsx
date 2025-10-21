
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


