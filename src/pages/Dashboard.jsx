import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, deleteUser } from "../redux/userSlice";
import { Button, Spinner, Table } from "react-bootstrap";
import NavbarComponents from "../components/Navbar";
import FormComponents from "../components/Form";
import SearchBar from "../components/Search";
import ConfirmationModal from "../components/Modal";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [query, setQuery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const confirmDelete = (userId) => {
    setSelectedUserId(userId);
    setShowConfirm(true);
  };

  const handleConfirmDelete  = () => {
    if (selectedUserId !== null) {
      handleDelete(selectedUserId); 
    }
    setShowConfirm(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
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
          <ConfirmationModal
            show={showConfirm}
            title="Confirm Deletion"
            message="Are you sure you want to delete this user?"
            onClose={() => setShowConfirm(false)}
            onConfirm={handleConfirmDelete}
          />
          <Button
            onClick={() => setShowModal(true)}
            variant="dark"
            className="mb-3">
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
                  <td>
                    {user.company.name} - {user.company.catchPhrase}
                  </td>
                  <td>
                    {user.address.street}, {user.address.suite},{" "}
                    {user.address.city}, {user.address.zipcode}
                  </td>
                  <td>
                    <Button
                      variant="link"
                      className="text-warning"
                      onClick={() => {
                        setEditUser(user);
                        setShowModal(true);
                      }}>
                      Edit
                    </Button>
                    <Button
                      variant="link"
                      className="text-danger"
                      onClick={() => confirmDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>

        <FormComponents
          show={showModal}
          handleClose={() => setShowModal(false)}
          editUser={editUser}
        />
      </div>
    </>
  );
};

export default Dashboard;
