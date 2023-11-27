import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";

import { useDispatch, useSelector } from "react-redux";

import { useAdminRegisterMutation } from "../../slices/adminApiSlice";
import { setCredentials } from "../../slices/adminAuthSlice";

import { toast } from "react-toastify";

import Loader from "../../components/Loader";






const AdminRegisterScreen = () => {


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminRegistrationKey, setAdminRegistrationKey] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { adminInfo } = useSelector( (state) => state.adminAuth );

  const [register, { isLoading }] = useAdminRegisterMutation();

  useEffect( () => {

    if(adminInfo) {

      navigate('/admin');

    }

  }, [ navigate, adminInfo ] );

  const submitHandler = async (e) => {
    
    e.preventDefault();
    
    if(password !== confirmPassword){

      toast.error('Passwords do not match.');

    }else{

      try{

        const responseFromApiCall = await register( { name, email, password, adminRegistrationKey } ).unwrap();

        dispatch( setCredentials( { ...responseFromApiCall } ) );
        
        navigate('/admin');

      }catch(err){

        toast.error( err?.data?.errors[0]?.message || err?.error );

      }

    }

  };



  return (
    <FormContainer>
      <h1>Admin Registration</h1>

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

            <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>Admin Registration Code</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Enter admin registration code"
                    value={adminRegistrationKey}
                    onChange={(e) => setAdminRegistrationKey(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3"> Sign Up </Button>
      </Form>

      { isLoading && <> <Loader/> </>}

      <Row className="py-3">
        <Col> Already have an account? <Link to={`/admin/login`}>Login</Link></Col>
      </Row>
      
    </FormContainer>
  );
};

export default AdminRegisterScreen;
