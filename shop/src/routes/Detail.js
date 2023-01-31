import {useParams} from "react-router-dom";
import {Nav} from 'react-bootstrap';
import {useContext, useEffect, useState} from "react";
import { addCart } from "./../store.js";


import {Context1} from './../App.js'
import {useDispatch} from "react-redux";

function Detail(props) {
    let {id} = useParams();
    let 찾는상품 = props.shoes.find(x => x.id == id);
    let [탭, 탭변경] = useState(0);
    let dispatch = useDispatch();
    let title  = 찾는상품.title;


    useEffect(()=>{
        let storage =  localStorage.getItem('watched');
        storage = JSON.parse(storage);
        storage.push(찾는상품.id);
        storage = new Set(storage);
        storage = Array.from(storage);
        localStorage.setItem('watched',JSON.stringify(storage))

    },[])
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + (찾는상품.id * 1 + 1) + ".jpg"} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{title}</h4>
                    <p>{찾는상품.content}</p>
                    <p>{찾는상품.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{dispatch(addCart({ id : 1, name : title, count : 1 }))}}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        탭변경(0)
                    }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        탭변경(1)
                    }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => {
                        탭변경(2)
                    }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭}/>

        </div>
    )
}

function TabContent({탭}) {
    let [fade, setFade] = useState('')
    let {재고} = useContext(Context1)
    useEffect(()=>{
        let a = setTimeout(()=>{setFade('end')},10)

        return ()=>{
            clearTimeout(a);
            setFade('');
        }
    },[탭])
    return (<div className={'start ' +  fade}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>);
}

export default Detail;
