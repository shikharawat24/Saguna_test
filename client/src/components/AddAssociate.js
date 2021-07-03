import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const speacialization = [
  { id: 1, value: "ASP.NET" },
  { id: 2, value: "Web API" },
  { id: 3, value: "Node.js" },
  { id: 4, value: "React.js" },
  { id: 5, value: "Angular.js" },
  { id: 6, value: "Vue.js" },
  { id: 7, value: "Knockout" },
  { id: 8, value: "SharePoint" },
];

function AddAssociate(props) {
  const [associate, setAssociate] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [skills, setSkills] = useState([]);

  const [submitted, setSubmitted] = useState(false);

  const onChangeSkills = (event) => {
    var item = event.target.value;

    if (skills.includes(item)) {
      setSkills(skills.filter((name) => name !== item));
      return;
    }
    skills.push(item);
    setSkills([...skills]);
    console.log(skills);
  };

  const onChangeName = (event) => {
    setAssociate({
      ...associate,
      name: event.target.value,
    });
  };

  const onChangePhone = (event) => {
    setAssociate({
      ...associate,
      phone: event.target.value,
    });
  };

  const onChangeAddress = (event) => {
    setAssociate({
      ...associate,
      address: event.target.value,
    });
  };

  const cancel = () => {
    props.history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { associate, skills };
    setSubmitted({ submitted: true });
    console.log(data);
    if (
      associate.name &&
      associate.phone &&
      associate.address &&
      skills.length !== 0
    ) {
      axios
        .post("http://localhost:4000/add", data)
        .then((d) => {
          props.history.push("/");
        })
        .catch((er) => alert(er));
    } else if (
      associate.name &&
      associate.phone &&
      associate.address &&
      skills.length === 0
    ) {
      alert("Select atleast one Specialization!");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:4000/associates/${props.match.params.id}`)
      .then(
        (response) => {
          setAssociate({
            ...associate,
            name: response.data.data[0].AssociateName,
            phone: response.data.data[0].Phone,
            address: response.data.data[0].Address,
          });
          setSkillsValues(response.data.data[0].SpecializationName);
        }

        //setSkills([...skills]);
      )
      .catch((err) => console.log("Fetch error. API is not available."));
  });

  const setSkillsValues = (data) => {
    //console.log(data); // "Vue.js,Angular.js,Web API"
    let arr = data.split();
    console.log(arr);
    arr.map((item) => {
      let index = speacialization.find((x) => x.value === item).id;
      return index;
    });
  };

  const getTitle = () => {
    if (props.match.params.id) {
      return <h3 className="text-center">Update Associate Details</h3>;
    } else {
      return <h3 className="text-center">Add Associate Details</h3>;
    }
  };

  return (
    <div>
      <br></br>
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label> Associate Name: </label>
                  <input
                    placeholder="Associate Name"
                    name="associateName"
                    className="form-control"
                    value={associate.name}
                    onChange={onChangeName}
                  />
                  {submitted && !associate.name && (
                    <div className="text-danger">Name is required!</div>
                  )}
                </div>
                <div className="form-group">
                  <label> Phone No: </label>
                  <input
                    placeholder="Phone No"
                    name="phoneNumber"
                    className="form-control"
                    value={associate.phone}
                    onChange={onChangePhone}
                  />
                  {submitted && !associate.phone && (
                    <div className="text-danger">Phone number is required!</div>
                  )}
                </div>
                <div className="form-group">
                  <label> Address: </label>
                  <input
                    placeholder="Address"
                    name="address"
                    className="form-control"
                    value={associate.address}
                    onChange={onChangeAddress}
                  />
                  {submitted && !associate.address && (
                    <div className="text-danger">Address is required!</div>
                  )}
                </div>
                <div className="form-group ">
                  <label> Specialization: </label>
                  {speacialization.map((item) => (
                    <ul>
                      <label>
                        <input
                          type="checkbox"
                          class="form-check-input"
                          value={item.id}
                          onChange={onChangeSkills}
                        />
                        {item.value}
                      </label>
                    </ul>
                  ))}
                  {submitted && !skills && (
                    <div className="text-danger">Address is required!</div>
                  )}
                </div>
                <button className="btn btn-success">Save</button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={cancel}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAssociate;
