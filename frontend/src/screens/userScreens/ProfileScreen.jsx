import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";

import { useDispatch, useSelector } from "react-redux";

import { setCredentials } from "../../slices/authSlice";
import { useUpdateUserMutation } from "../../slices/userApiSlice";

import { toast } from "react-toastify";

import Loader from "../../components/Loader";

import { PROFILE_IMAGE_DIR_PATH } from "../../utils/constants";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      try {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("profileImage", profileImage);

        const responseFromApiCall = await updateProfile(formData).unwrap();

        dispatch(setCredentials({ ...responseFromApiCall }));

        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.errors[0]?.message || err?.error);
      }
    }
  };

  return (
    <FormContainer>
      {userInfo.profileImageName && (
        <img
          src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
          alt={userInfo.name}
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            display: "block",
            marginTop: "5px",
            marginLeft: "115px",
            marginBottom: "10px",
          }}
        />
      )}

      <h3
        style={{
          display: "block",
          marginTop: "5px",
          marginLeft: "100px",
          marginBottom: "5px",
        }}
      >
        Update Profile
      </h3>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name here..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="profileImage">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {" "}
          Save{" "}
        </Button>
      </Form>

      {isLoading && (
        <>
          {" "}
          <Loader />{" "}
        </>
      )}
    </FormContainer>
  );
};

export default ProfileScreen;
