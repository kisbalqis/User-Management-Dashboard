import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  addUser,
  updateUser,
} from "../redux/userSlice";
import { Button, Spinner, Table, Modal, Form } from "react-bootstrap";
import NavbarComponents from "../components/Navbar";
import SearchBar from "../components/Search";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [query, setQuery] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    website: "",
    company: { name: "" },
    address: { street: "" },
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("company.")) {
      setNewUser((prev) => ({
        ...prev,
        company: { ...prev.company, [name.split(".")[1]]: value },
      }));
    } else if (name.startsWith("address.")) {
      setNewUser((prev) => ({
        ...prev,
        address: { ...prev.address, [name.split(".")[1]]: value },
      }));
    } else {
      setNewUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSaveUser = () => {
    if (newUser.name && newUser.email && newUser.username) {
      if (editUser) {

        dispatch(updateUser(newUser)); 
      } else {
       
        dispatch(addUser(newUser)); 
      }
      setShowModal(false); 
    } else {
      alert("Please fill all required fields.");
    }
  };
  

  const handleEditUser = (user) => {
    setEditUser(user);
    setNewUser(user); 
    setShowModal(true); 
  };
  

  const handleAddUser = () => {
    setEditUser(null);
    setNewUser({
      name: "",
      email: "",
      username: "",
      phone: "",
      website: "",
      company: { name: "" },
      address: { street: "" },
    });
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.address.street.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <NavbarComponents />
      <div className="container mt-5">
        <div className="d-flex gap-4 mb-3">
          <Button onClick={handleAddUser} variant="dark" className="mb-3">
            Add User
          </Button>
          {loading && <Spinner animation="border" />}
          {error && <p className="text-danger">{error}</p>}
          <SearchBar query={query} setQuery={setQuery} className="mb-3" />
        </div>

        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">
                  <strong>No data found</strong>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.phone}</td>
                  <td>
                    <a
                      href={`http://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer">
                      {user.website}
                    </a>
                  </td>
                  <td>{user.company.name}</td>
                  <td>{user.address.street}</td>
                  <td>
                    <Button
                      variant="link"
                      className="text-warning"
                      onClick={() => handleEditUser(user)}>
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editUser ? "Edit User" : "Add User"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  placeholder="Enter name"
                />
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  placeholder="Enter email"
                />
              </Form.Group>

              {/* Username */}
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                />
              </Form.Group>

              {/* Phone */}
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={newUser.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                />
              </Form.Group>

              {/* Website */}
              <Form.Group className="mb-3">
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  name="website"
                  value={newUser.website}
                  onChange={handleInputChange}
                  placeholder="Enter website"
                />
              </Form.Group>

              {/* Company Name */}
              <Form.Group className="mb-3">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  name="companyName"
                  value={newUser.company.name}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      company: { ...newUser.company, name: e.target.value },
                    })
                  }
                  placeholder="Enter company name"
                />
              </Form.Group>

              {/* Address Street */}
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="addressStreet"
                  value={newUser.address.street}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      address: { ...newUser.address, street: e.target.value },
                    })
                  }
                  placeholder="Enter address street"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="dark" onClick={handleSaveUser}>
              {editUser ? "Save Changes" : "Add User"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
