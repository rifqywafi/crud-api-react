import * as React from "react";
import Header from "./layouts/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";

import Login from "./components/user/login";
import Register from "./components/user/register";
import EditBook from "./components/book/edit.component";
import BookList from "./components/book/list.component";
import CreateBook from "./components/book/create.component";
import EditProduct from "./components/product/edit.component";
import ProductList from "./components/product/list.component";
import CreateProduct from "./components/product/create.component";
import Home from "./components/home";

function App() {
  return (
  <Router>
    <Header />
    <Container className="mt-5">
      <Row>
        <Col md={12}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            <Route exact path='/product' element={<ProductList />} />
            <Route path="/book/create" element={<CreateBook />} />
            <Route path="/book/edit/:id" element={<EditBook />} />
            <Route exact path='/book' element={<BookList />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  </Router>);
}

export default App;