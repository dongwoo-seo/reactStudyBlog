import {useParams} from "react-router-dom";
import {Nav} from 'react-bootstrap';
import {useEffect, useState} from "react";

function Detail(props) {
    let {id} = useParams();
    let 찾는상품 = props.shoes.find(x => x.id == id);
    let [탭, 탭변경] = useState(0);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes" + (찾는상품.id * 1 + 1) + ".jpg"} width="100%"/>
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾는상품.title}</h4>
                    <p>{찾는상품.content}</p>
                    <p>{찾는상품.price}원</p>
                    <button className="btn btn-danger">주문하기</button>
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
