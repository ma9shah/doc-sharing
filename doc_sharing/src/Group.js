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

  return (
    <>
      <div className="content">
      <Col>
            <Card className="card-stats">
              <CardBody>
        <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big">
                      <i className="nc-icon nc-circle-10" />
                      &nbsp;
                      <i className="nc-icon nc-circle-10" />
                      <br></br>
                      <i className="nc-icon nc-circle-10" />
                      &nbsp;
                      <i className="nc-icon nc-circle-10" />
                    </div>
                    
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                        <p>{props.groupId}</p>
                    <CardTitle tag="p">{groupData.name}</CardTitle>
                      <p className="card-category">{groupData.description}</p>
                      <p />
                    </div>
                  </Col>
                </Row>
                </CardBody>
              <CardFooter>
                <hr />
                <div className="stats text-center">
                    {/* <button onClick={()=>{navigate(/texteditor)}}> Open </button> */}
                  <a type="button" href="http://localhost:3000/">Open</a>
                </div>
              </CardFooter>
            </Card>
          </Col>
      </div>
    </>
  );
}