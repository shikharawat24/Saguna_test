import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function ListAssociate(props) {
  const [associates, setAssociate] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/list/associates")
      .then((response) => {
        setAssociate(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const addAssociate = () => {
    props.history.push("/add-associate");
  };

  const editAssociate = (id) => {
    console.log(id);
    props.history.push(`/edit-associate/${id}`);
  };

  return (
    <div>
      <h2 className="text-center">Associate List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={addAssociate}>
          Add Associate
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Associate ID</th>
              <th> Associate Name</th>
              <th> Phone</th>
              <th> Address</th>
              <th> Speacialization</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {associates.map((associate) => (
              <tr key={associate.AssociateId}>
                <td>{associate.AssociateId}</td>
                <td> {associate.AssociateName} </td>
                <td> {associate.Phone}</td>
                <td> {associate.Address}</td>
                <td> {associate.SpecializationName}</td>
                <td>
                  <button
                    onClick={() => editAssociate(associate.AssociateId)}
                    className="btn btn-info"
                  >
                    Update{" "}
                  </button>
                  <button
                    style={{ marginLeft: "20px" }}
                    onClick={() => this.deleteAssociate(associate.AssociateId)}
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListAssociate;
