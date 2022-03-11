import React, { useState, useEffect, Fragment } from "react";
// react plugin used to create charts
// import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { useDispatch, useSelector } from 'react-redux';
import { connect, io } from 'socket.io-client';
import allActions from './actions';
import routes from "./routes";
import { useNavigate } from 'react-router-dom';
import Group from './Group';
import TextEditor from './TextEditor';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

export default function Dashboard() {
    const [socket, setSocket] = useState();
    const [username, setUsername] = useState();
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [loadId, setLoadId] = useState();
    const [groupPasscode, setPasscode] = useState();

    useEffect(() => {
        const socket_instance = io("http://localhost:3003")
        setSocket(socket_instance)
        console.log(currentUser.user.name);
        socket_instance.emit('getGroupList', currentUser.user.name);
        socket_instance.on("groups", (groupsList)=>{
            console.log(groupsList);
            setGroups(groupsList);
        });
    
        return () => {
        }
      }, [])

      function addNewGroup(e){
          e.preventDefault();
          dispatch(allActions.userActions.setUser(currentUser));
          socket.emit('addNewGroup', groupPasscode, currentUser.user.name);
          socket.on('added', added=>{
              console.log(added);
          });
          socket.emit('getGroupList', currentUser.user.name);
          socket.on("groups", (groupsList)=>{
            console.log(groupsList);
            setGroups(groupsList);
        });
      }

      function handleChange(e){
        setPasscode(e.target.value);
        console.log(groupPasscode);
      }

  return (
    <Fragment>
        {groups!=null &&
        <table className="table table-hover mt-5 text-center">
            <thead className="thead-light">
                <tr>
                <th className="text-left" scope="col">Group</th>
                <th className="text-left" scope="col">Description</th>
                <th scope="col">Open</th>
                </tr>
            </thead>
            <tbody>
                { /*<tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr> */}
                {groups!=null && groups.map(group => (
                    <Group groupId={group}></Group>
                    
                ))}
            </tbody>
        </table>
}

        {/* <h1 className="text-center mt-5">Join new groups?</h1>
        <form className="d-flex mt-5">
            <input type="text" className="form-control" value={groupPasscode} onChange={handleChange}></input>
            <button className="btn btn-success" onClick={addNewGroup}>Add</button>
        </form> */}
    </Fragment>
  );
}