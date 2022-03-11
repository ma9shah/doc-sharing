import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        const socket_instance = io("http://localhost:3003")
        setSocket(socket_instance)
        console.log(currentUser.user.name);
        socket_instance.emit('getGroupList', currentUser.user.name);
        socket_instance.on("groups", (groupsList)=>{
            console.log(groupsList);
            setGroups(groupsList);
        });
        // dispatch(allActions.userActions.setUser(user))
        // setSubmitted(false);
        // setUsername("sana");
        // socket_instance.on('data', data=>{
        //   setText(data);
        //   console.log('cient ', data);
        // })    
    
        return () => {
        }
      }, [])

  return (
    <>
      <div className="content">
        <Row>
        {groups.map(group=>
                      <Group groupId = {group}></Group>
                  )}
          {/* <Col>
            <Card className="card-stats">
              <CardBody> */}
                  
                {/* <Row>
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
                    <CardTitle tag="p">Keystone group</CardTitle>
                      <p className="card-category">Work on keystone project Winter 22</p>
                      <p />
                    </div>
                  </Col>
                </Row> */}
              {/* </CardBody>
              <CardFooter>
                <hr />
                <div className="stats text-center">
                  <a type="button" href="http://localhost:3000/">Join</a>
                </div>
              </CardFooter>
            </Card>
          </Col> */}
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-simple-add text-success" />
                    </div>
                  </Col>
                  <Col md="20" xs="7">
                    <div className="numbers">
                      <p className="card-category">New Task</p>
                      <CardTitle tag="p">______</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats text-center">
                  <a type="button" className="far fa-calendar"> Create Task</a>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Productivity Graph</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
                {/* <Line
                  data={dashboard24HoursPerformanceChart.data}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                /> */}
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}