import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import { increase } from "../store/userSlice.js";
import { addCount } from "../store.js";

function Cart() {
    let state = useSelector((state => state));
    let dispatch = useDispatch();
    return (<div>
        <h6>{state.user.name}  {state.user.age}의 장바구니</h6>
        <button onClick={()=>{dispatch(increase(10))}}>버튼</button>
        <Table>
            <thead>
            <tr>
                <th>#</th>
                <th>상품명</th>
                <th>수량</th>
                <th>변경하기</th>
            </tr>
            </thead>
            <tbody>
            {
                state.cart.map((el, index) => {
                    return (<tr>
                        <td>{index + 1}</td>
                        <td>{el.name}</td>
                        <td>{el.count}</td>
                        <td>
                            <button onClick={()=>{dispatch(addCount(el.id))}}> 버튼 </button>
                        </td>
                    </tr>
                )
                })
                }
                </tbody>
                </Table>
                </div>)
                }

                export default Cart;