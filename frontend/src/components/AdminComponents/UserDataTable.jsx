import { useState } from "react";
import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useUpdateUserByAdminMutation } from "../../slices/adminApiSlice";

const UsersDataTable = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // State for the confirmation dialog
  const [userIdToDelete, setUserIdToDelete] = useState(null); // Track the user ID to delete

  const [showUpdateModal, setShowUpdateModal] = useState(false); // State for the update modal
  const [userIdToUpdate, setUserIdToUpdate] = useState("");
  const [userNameToUpdate, setUserNameToUpdate] = useState("");
  const [userEmailToUpdate, setUserEmailToUpdate] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [updateUserByAdmin, { isLoading: isUpdating }] = useUpdateUserByAdminMutation();

  const handleDelete = async () => {
    try {
      const responseFromApiCall = await deleteUser({ userId: userIdToDelete });
      toast.success("User Deleted Successfully.");
      setUserIdToDelete(null); // Clear the user ID to delete
      setShowConfirmation(false); // Close the confirmation dialog

      // Reload the page to reflect the updated data
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.errors[0]?.message || err?.error);
    }
  };

  const handleOpenUpdateModal = (user) => {
    setUserIdToUpdate(user._id)
    setUserNameToUpdate(user.name);
    setUserEmailToUpdate(user.email);
    setShowUpdateModal(true);
  };

  const handleUpdate = async () => {
    try {
      const responseFromApiCall = await updateUserByAdmin({
        userId: userIdToUpdate,
        name: userNameToUpdate,
        email: userEmailToUpdate
      });
      toast.success("User Updated Successfully.");
      setUserIdToUpdate(null); // Clear the user ID to update
      setShowUpdateModal(false); // Close the update modal

      // Reload the page to reflect the updated data
      window.location.reload();
      
    } catch (err) {
      toast.error(err?.data?.errors[0]?.message || err?.error);
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  type="button"
                  variant="primary"
                  className="mt-3"
                  onClick={() => handleOpenUpdateModal(user)}
                >
                  Update
                </Button>
              </td>
              <td>
                <Button
                  type="button"
                  variant="danger"
                  className="mt-3"
                  onClick={() => {
                    setUserIdToDelete(user._id); // Set the user ID to delete
                    setShowConfirmation(true); // Open the confirmation dialog
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <BootstrapForm>
        <BootstrapForm.Group className="mt-3" controlId="exampleForm.ControlInput1">
          <BootstrapForm.Label>Search users:</BootstrapForm.Label>
          <BootstrapForm.Control
            style={{ width: "500px" }}
            value={searchQuery}
            type="text"
            placeholder="Enter Name or email........"
            onChange={handleSearch}
          />
        </BootstrapForm.Group>
      </BootstrapForm>

      {/* Confirmation Dialog */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update User Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BootstrapForm>
            <BootstrapForm.Group controlId="name">
              <BootstrapForm.Label>Name</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                value={userNameToUpdate}
                onChange={(e) =>
                    setUserNameToUpdate(e.target.value)
                }
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="email">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <BootstrapForm.Control
                type="email"
                value={userEmailToUpdate}
                onChange={(e) =>
                    setUserEmailToUpdate(e.target.value)
                }
              />
            </BootstrapForm.Group>
          </BootstrapForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersDataTable;
