import "./App.css";
import axios from "axios";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

class App extends React.Component {
  getData = async () => { // removed const, return type
    const response = await axios("http://localhost:8000/myrocket");
    console.log(response.data);
  };
  /*
  useEffect(() => {
    getData();
  }, []);
  */
  render() {
    return (
      <Container fluid className="App bg-light" >
        <Container className="bg-white" >
          <Col>
            <Row className="mt-1 float-start">
              <Col>
                <Button variant="outline-primary" >Login </Button>
              </Col>
            </Row>
          </Col>
        </Container>
      </Container >
    )
  }
}

export default App;
