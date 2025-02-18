import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../redux/userSlice";
import { Modal, Button, Form } from "react-bootstrap";
import ConfirmationModal from "./Modal";


const FormComponents = ({ show, handleClose, editUser }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: "", email: "" });
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
    } else {
      setUser({ name: "", email: "" });
    }
  }, [editUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirm(true); 
  };

  const handleConfirm = () => {
    if (editUser) {
      dispatch(updateUser(user));
    } else {
      dispatch(addUser({ ...user, id: Math.floor(Math.random() * 1000) }));
    }
    setShowConfirm(false);
    handleClose();
  };

  return (
    <div>
      <ConfirmationModal
        show={showConfirm}
        title="Confirm"
        message="Are you sure you want to save this data?"
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
      />

      <Modal show={show && !showConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="dark">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FormComponents;
