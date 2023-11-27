import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { useSelector } from "react-redux";

import { PROFILE_IMAGE_DIR_PATH } from "../../utils/constants";

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {userInfo ? (
            <>
              {userInfo.profileImageName && (
                <img
                  src={PROFILE_IMAGE_DIR_PATH + userInfo.profileImageName}
                  alt={userInfo.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <h2 className="text-center mb-4">
                {" "}
                Welcome back {userInfo.name}{" "}
              </h2>
              <p className="text-center mb-4"> Email: {userInfo.email} </p>
              <div className="d-flex">
                <LinkContainer to="/profile">
                  <Button variant="primary" className="me-3">
                    Manage Profile
                  </Button>
                </LinkContainer>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-center mb-4"> Mykare Health User </h2>
              <p className="text-center mb-4">
                {" "}
                Please Login to access User Dashboard{" "}
              </p>
              <div className="d-flex">
                <LinkContainer to="/login">
                  <Button variant="primary" className="me-3">
                    Login
                  </Button>
                </LinkContainer>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
