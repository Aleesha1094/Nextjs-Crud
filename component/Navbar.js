import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>NextJS-MySQL <b>CRUD</b></h2>
          </div>
          <div className="col-sm-6">
            <a href="#addEmployeeModal" className="btn btn-success" data-toggle="modal">
              <i className="material-icons">&#xE147;</i> <span>Add New Employee</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
