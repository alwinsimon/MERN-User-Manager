import { useState } from "react";
import { Button, Modal, Table, Form as BootstrapForm } from "react-bootstrap";
import { toast } from "react-toastify";
import { useBlockUserMutation, useUnblockUserMutation, useUpdateUserByAdminMutation } from "../../slices/adminApiSlice";

const UsersDataTable = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [showBlockingConfirmation, setShowBlockingConfirmation] = useState(false); // State for the blocking confirmation dialog
  const [showUnblockingConfirmation, setShowUnblockingConfirmation] = useState(false); // State for the unblocking confirmation dialog

  const [userIdToDelete, setUserIdToDelete] = useState(null); // Track the user ID to delete
  const [userIdToBlock, setUserIdToBlock] = useState(null); // Track the user ID to block
  const [userIdToUnblock, setUserIdToUnblock] = useState(null); // Track the user ID to unblock

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

  const [blockUser, { isBlockingLoading }] = useBlockUserMutation();
  const [unblockUser, { isUnblockingLoading }] = useUnblockUserMutation();
  const [updateUserByAdmin, { isLoading: isUpdating }] = useUpdateUserByAdminMutation();


  const handleBlock = async () => {
    try {
      const responseFromApiCall = await blockUser({ userId: userIdToBlock });
      toast.success("User Blocked Successfully.");
      setUserIdToBlock(null); // Clear the user ID to block
      setShowBlockingConfirmation(false); // Close the blocking confirmation dialog

    } catch (err) {
      toast.error(err?.data?.errors[0]?.message || err?.error);
    }
  };

  const handleUnblock = async () => {
    try {
      const responseFromApiCall = await unblockUser({ userId: userIdToUnblock });
      toast.success("User Unblocked Successfully.");
      setUserIdToUnblock(null); // Clear the user ID to unblock
      setShowUnblockingConfirmation(false); // Close the unblocking confirmation dialog

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
            <th>Block</th>
            <th>Unblock</th>
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
                    setUserIdToBlock(user._id);
                    setShowBlockingConfirmation(true);
                  }}
                >
                  Block
                </Button>
              </td>
              <td>
                <Button
                  type="button"
                  variant="success"
                  className="mt-3"
                  onClick={() => {
                    setUserIdToUnblock(user._id);
                    setShowUnblockingConfirmation(true);
                  }}
                >
                  Unblock
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <BootstrapForm>
        <BootstrapForm.Group
          className="mt-3"
          controlId="exampleForm.ControlInput1"
        >
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

      {/* Blocking Confirmation Dialog */}
      <Modal
        show={showBlockingConfirmation}
        onHide={() => setShowBlockingConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to block this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowBlockingConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleBlock}
            disabled={isBlockingLoading}
          >
            {isBlockingLoading ? "Blocking..." : "Block"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Un Blocking Confirmation Dialog */}
      <Modal
        show={showUnblockingConfirmation}
        onHide={() => setShowUnblockingConfirmation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Un-Block</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Un-Block this user?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowUnblockingConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleUnblock}
            disabled={isUnblockingLoading}
          >
            {isBlockingLoading ? "Un-Blocking..." : "Un-Block"}
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
                onChange={(e) => setUserNameToUpdate(e.target.value)}
              />
            </BootstrapForm.Group>
            <BootstrapForm.Group controlId="email">
              <BootstrapForm.Label>Email</BootstrapForm.Label>
              <BootstrapForm.Control
                type="email"
                value={userEmailToUpdate}
                onChange={(e) => setUserEmailToUpdate(e.target.value)}
              />
            </BootstrapForm.Group>
          </BootstrapForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersDataTable;
