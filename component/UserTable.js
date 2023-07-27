import { useEffect,useState, useRef } from 'react';
import Alert from './Alert';

export default function UserTable() {
  const productNameUpdateRef = useRef();
  
  const [alert, setAlert] = useState("");
  const [products, setProducts] = useState([]);
  const setDelete = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const setUpdated = useState(false);

  
  async function getProducts() {
    const apiUrl = `http://localhost:3000/api/product`;
    const postData = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await fetch(apiUrl, postData);
    const response = await res.json();
    setProducts(response.products);
  };

  function handleFormSubmit(event) {
    const productNameU = productNameUpdateRef.current.value.trim();
    const productId = currentProduct.id;
    updateProduct(productId, productNameU);
    productNameUpdateRef.current.value = '';
  }
  
  function setCurrentProductForEdit(product) {
    setCurrentProduct(product);
  }
  
  async function updateProduct(productid, productNameU) {
    if (!productid) return;
    
    const apiUrl = `http://localhost:3000/api/product`;
    const postData = {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: productid,
        Name: productNameU,
      }),
    };  
  
    try {
      const res = await fetch(apiUrl, postData);
      if (res.ok) {
        setUpdated(true);
        const productIdUpdated = productid;
        const productUpdatedName = productNameU;
        const StateUpdate = products.map((product) => {
          if (product.id === productIdUpdated) {
            const productUpdated = {
              ...product,
              Name: productUpdatedName,
            };
            return productUpdated;
          } else {
            return {
              ...product,
            };
          }
        });
        setProducts(StateUpdate);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
    setAlert("User Updated Successfully");
  }
  
  async function deleteProduct(id) {
    if (!id) return;
    const apiUrl = `http://localhost:3000/api/product`;
    const postData = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      id: id,
    }),
  };  
    const res = await fetch(apiUrl, postData);
    const response = await res.json();
    setAlert("User Deleted Successfully");
    if (response.response.message !== "success") return;
    setDelete(true);
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <Alert text={alert} setAlert={setAlert} styles={alert ? "block" : "none"}></Alert>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
              </td>
              <td>{product.id}</td>
              <td>{product.Name}</td>
              <td>
                <a href="#deleteEmployeeModal" className="delete" data-toggle="modal" onClick={() => deleteProduct(product.id)}>
                  <i className="material-icons" data-toggle="tooltip" title="Delete">
                    &#xE872;
                  </i>
                </a>
                <a href="#editEmployeeModal" className="edit" data-toggle="modal" onClick={() => setCurrentProductForEdit(product)} >
                  <i className="material-icons" data-toggle="tooltip" title="Edit">
                    &#xE869;
                  </i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
                {/* Edit Employee Modal */}
                <div id="editEmployeeModal" className="modal fade">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <form action="#" method="PUT" onSubmit={handleFormSubmit}>
                        <div className="modal-header">
                          <h4 className="modal-title">Edit Employee</h4>
                          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                        </div>
                        <div className="modal-body">
                          <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control"  ref={productNameUpdateRef} required/>
                          </div>
                          </div>
                        <div className="modal-footer">
                          <input type="button" name="submit" className="btn btn-default" data-dismiss="modal" value="Cancel" />
                          <input type="submit" className="btn btn-info" value="Save"/>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>      
    </div>
  );
};