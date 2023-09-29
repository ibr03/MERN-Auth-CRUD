import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Login, Signup, Home } from "./pages";
import CreateRecord from './components/CreateRecord';
import UpdateRecord from './components/UpdateRecord';
import RecordList from './components/RecordList';

function App() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route exact path="/create-record" element={<CreateRecord />} />
                <Route exact path="/update-record/:id" element={<UpdateRecord />} />
                <Route exact path="/record-list" element={<RecordList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
