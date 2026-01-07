import { useEffect, useState } from "react";

// ✅ CORRECT: Go up 3 levels to reach 'src'
// Also, ensure the file name matches what you created ('admin' or 'adminproduct')
import { 
  getAdminProducts, 
  deleteAdminProduct, 
  updateAdminProduct, 
  addAdminProduct 
} from "../../../services/adminproduct"; 
import Loader from "../../../components/Loader/Loader";
import "./AdminProduct.scss"; 

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const EMPTY_FORM = {
    title: '',
    price: '',
    category: '',
    description: '',
    image: 'https://i.pravatar.cc' // Default placeholder image
  };

  const [editingProduct, setEditingProduct] = useState(null); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAdminProducts();
      setProducts(res.data);
    } catch (err) {
        console.log(err);
      alert("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setEditingProduct(EMPTY_FORM); // Open form with empty data (No ID)
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Delete Product #${id}?`)) {
      try {
        await deleteAdminProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
      } catch (err) {
        console.log(err);
        alert("Failed to delete");
      }
    }
  };

  // 4. Unified Submit Handler (Add OR Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingProduct.id) {
        // === CASE A: UPDATE (Has ID) ===
        const res = await updateAdminProduct(editingProduct.id, editingProduct);
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? res.data : p));
        alert("Product updated!");
      } else {
        // === CASE B: ADD NEW (No ID) ===
        const res = await addAdminProduct(editingProduct);
        // FakeStoreAPI returns the new object with a new ID (e.g., 21)
        setProducts(prev => [res.data, ...prev]); // Add to top of list
        alert("Product added!");
      }
      setEditingProduct(null); // Close form
    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({ ...prev, [name]: value }));
  };

  if (loading && !editingProduct) return <Loader />;

  return (
    <div className="admin-products-page">
      <div className="container">
        
        {/* HEADER */}
        <div className="admin-header">
          <h2>Product Admin</h2>
          
          {/* 5. Toggle Buttons: Show "Back" if editing, "Add" if listing */}
          {editingProduct ? (
            <button className="btn-back" onClick={() => setEditingProduct(null)}>
              &larr; Back to List
            </button>
          ) : (
            <button className="btn-add" onClick={handleAddNew}>
              + Add New Product
            </button>
          )}
        </div>

        {!editingProduct ? (
          /* TABLE VIEW */
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td><img src={p.image} alt="" className="table-img" /></td>
                    <td className="title-cell">{p.title}</td>
                    <td>${p.price}</td>
                    <td className="actions-cell">
                      <button className="btn-edit" onClick={() => setEditingProduct(p)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDelete(p.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          /* FORM VIEW */
          <div className="edit-form-wrapper">
            {/* 6. Dynamic Title */}
            <h3>{editingProduct.id ? `Edit Product #${editingProduct.id}` : 'Add New Product'}</h3>
            
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input name="title" value={editingProduct.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input type="number" name="price" value={editingProduct.price} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input name="category" value={editingProduct.category} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" value={editingProduct.image} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" rows="4" value={editingProduct.description} onChange={handleInputChange} required />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button type="submit" className="btn-save">
                  {/* 7. Dynamic Button Text */}
                  {editingProduct.id ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;