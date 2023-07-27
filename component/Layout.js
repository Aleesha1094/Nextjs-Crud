import React from 'react';
import UserTable from './UserTable';
import Alert from './Alert';
import Navbar from './Navbar';
import { useState, useRef } from 'react';

function Layout(){
  const productNameRef = useRef();

  const [setCreated] = useState(false);
  const [alert, setAlert] = useState("");

  async function addProduct() {
    const productName = productNameRef.current.value.trim();
    const apiUrl = `http://localhost:3000/api/product`;
    const postData = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      Name: productName,
    }),
  };  
    if (productName.length < 2) return;
    const res = await fetch(apiUrl, postData);
    const response = await res.json();
    setAlert("User Added Successfully");
    if (response.response.message !== "success") return;
    setCreated(true);
  }

  return (
    <div>
      {/* Add Employee Modal */}
      <div id="addEmployeeModal" className="modal fade">
        <div className="modal-dialog">
          <div className="modal-content">
            <form action="#" method="POST" onSubmit={addProduct}>
              <div className="modal-header">
                <h4 className="modal-title">Add Employee</h4>
                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" className="form-control" name="username" ref={productNameRef} required />
                </div>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-default" name="submit" data-dismiss="modal" value="Cancel" />
                <input type="submit" className="btn btn-success" value="Add"/>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="table-responsive d-flex flex-column">
      <Alert text={alert} setAlert={setAlert} styles={alert ? "block" : "none"}></Alert>
        <div className="table-wrapper">
            <Navbar/>
            <UserTable />
            </div>
      </div>
    </div>
  );
};

export default Layout;
