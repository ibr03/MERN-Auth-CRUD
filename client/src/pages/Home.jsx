import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState();

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login');
      }
      try {
        const { data } = await axios.post(
          "http://localhost:4000/patients",
          {},
          { withCredentials: true }
        );

        const { status, user } = data;
        setUsername(user);

        return status ? toast(`Hello ${user}`, {
          position: "top-right",
        }): (removeCookie("token"), navigate('/login'));
      } catch (error) {
        console.error("Axios Error:", error);
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate('/signup');
  };

  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
          <header className="App-header">
            <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand>
                  <Link className="nav-link">
                    Patient Health Record System
                  </Link>
                </Navbar.Brand>
                <Nav className="justify-content-end">
                  <Nav>
                    <Link to={'/create-record'} className="nav-link">
                      Create Patient Record
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to={'/record-list'} className="nav-link">
                      Record List
                    </Link>
                  </Nav>
                </Nav>
              </Container>
            </Navbar>
          </header>
        <button onClick={Logout}>LOG OUT</button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;