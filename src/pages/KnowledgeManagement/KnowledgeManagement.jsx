

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
const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
