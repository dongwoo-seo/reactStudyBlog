import './App.css';
import {Navbar, Container, Nav} from 'react-bootstrap';
import {createContext, useState} from "react";
import data from "./data.js";
import {Route, Routes, Link, useNavigate, Outlet} from "react-router-dom";
import Detail from "./routes/Detail.js";
import axios from 'axios';
import Cart from "./routes/Cart.js";
import {useQuery} from "react-query";

export let Context1 = createContext(); // state 보관함


function App() {
    useState(() => {
        localStorage.setItem('watched', JSON.stringify([]));
    }, [])
    let [shoes, setShoes] = useState(data);
    let [재고] = useState([10, 11, 12]);
    let navigate = useNavigate();

    let result = useQuery('작명', () =>
        axios.get('https://codingapple1.github.io/userdata.json').then((a) => {
            return a.data
        })
    )

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
                            navigate('/cart')
                        }}>Cart</Nav.Link>
                    </Nav>
                    <Nav className="ms-auto">{ result.isLoading ? '로딩중' : result.data.name }</Nav>
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
                        }).catch(() => {
                            console.log('실패');
                        })
                    }}>버튼
                    </button>
                </>}/>
                <Route path="/detail/:id" element={
                    <Context1.Provider value={{재고, shoes}}>
                        <Detail shoes={shoes}/>
                    </Context1.Provider>}
                />

                <Route path="/cart" element={<Cart/>}/>

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
