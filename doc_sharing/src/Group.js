import React, { useState, useEffect } from "react";
// react plugin used to create charts
// import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import { useDispatch, useSelector } from 'react-redux';
import { connect, io } from 'socket.io-client';
import allActions from './actions';
import routes from "./routes";
import { useNavigate } from 'react-router-dom';
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

export default function Group(props) {

    const [socket, setSocket] = useState();
    const [username, setUsername] = useState();
    const currentUser = useSelector(state => state.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState("");
    // const [loadId, setLoadId] = useState();

    useEffect(() => {
        const socket_instance = io("http://localhost:3003")
        setSocket(socket_instance)
        console.log("current group id", props.groupId);
        socket_instance.emit('getGroupData', props.groupId);
        socket_instance.on('groupData', (groupInfo)=>{
            console.log(groupInfo);
            setGroupData(groupInfo[0]);
        });
    
        return () => {
        }
      }, [])

    //   onClick={()=>{navigate('/texteditor',{state:{id:groupData.file}})}
    function handleNavigate(e) {
        e.preventDefault();
        navigate("/texteditor", {state:{id:groupData.file}});
    }

  return (
    <>
          <tr>
          <td className="text-left" scope="col">{groupData.name}</td>
                        <td className="text-left" scope="col">{groupData.description}</td>
                        <td><button scope="col" className="btn btn-danger" onClick={handleNavigate}>Open</button></td>
                    </tr>
            </>
  );
}