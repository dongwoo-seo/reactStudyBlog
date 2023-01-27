import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {useState} from "react";
import data from "./data.js";
import {Route, Routes, Link, useNavigate, Outlet} from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from 'axios';

function App() {

    let [shoes, setShoes] = useState(data);
    let navigate = useNavigate();

    return (
        <div className="App">
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Shop</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => {
                            navigate('/')
                        }}>Home</Nav.Link>
                        <Nav.Link onClick={() => {
                            navigate('/detail')
                        }}>Cart</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={<>
                    <div className="main-bg"></div>
                    <div className="container">
                        <div className="row">
                            {
                                shoes.map((el, i) => <Product i={i + 1} shoes={shoes[i]}/>)
                            }
                        </div>
                    </div>
                    <button onClick={() => {
                        axios.get('https://codingapple1.github.io/shop/data2.json').then((data) => {
                            let copy = [...shoes, ...data.data];
                            setShoes(copy);
                        }).catch(()=>{
                            console.log('실패');
                        })
                    }}>버튼
                    </button>
                </>}/>
                <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>

            </Routes>
        </div>
    );
}


function Product(props) {
    let navigate = useNavigate();
    return (
        <div className="col-md-4" onClick={() => {
            navigate('/detail/' + props.shoes.id)
        }}>
            <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%"/>
            < h4> {props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
        </div>)
}

function About() {
    return (
        <div>
            <h4>회사정보임</h4>
            <Outlet/>
        </div>)
}

export default App;
