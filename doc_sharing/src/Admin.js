import React, { useState, useEffect, Fragment } from "react";
import './Admin.css';
import { useNavigate } from 'react-router-dom';
import { connect, io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

export default function Admin() {
    const groupIdWrapped = { groupId : "621eb4decafae1037ee13e89"};
    const [socket, setSocket] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [groupData, setGroupData] = useState("");
    // const [loadId, setLoadId] = useState();

    useEffect(() => {
        const socket_instance = io("http://localhost:3003")
        setSocket(socket_instance)
        console.log("current group id", groupIdWrapped.groupId);
        socket_instance.emit('getGroupData', groupIdWrapped.groupId);
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
        <div className="task-manager">
        <div className="left-bar">
            <div className="left-content">
            <ul className="action-list">
            <li className="item">
            <img src="logo.png" style={{width:40}}></img>
            <div className="heading-container"><span className="heading">Collab</span>
            <p className="subHeading">Workspace</p>
            </div>
            
            </li>
            <li className="item active">
            <svg className="change-my-color" version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                 stroke="none">
                <path d="M162 498 c-83 -79 -153 -152 -157 -162 -9 -23 17 -46 52 -46 23 0 23
                -1 23 -125 0 -175 -14 -165 240 -165 254 0 240 -10 240 165 0 124 0 125 23
                125 37 0 63 24 52 47 -12 22 -303 303 -315 303 -5 0 -76 -64 -158 -142z m289
                -30 c71 -68 129 -126 129 -130 0 -5 -13 -8 -30 -8 l-29 0 -3 -142 -3 -143
                -195 0 -195 0 -3 143 -3 142 -29 0 c-17 0 -30 3 -30 7 0 6 251 251 258 252 2
                1 62 -54 133 -121z"/>
                </g>
                </svg>

                <span>Home</span>
                </li>
                <li className="item">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                     stroke="none">
                    <path d="M112 573 c-76 -37 -95 -96 -90 -278 3 -123 5 -134 30 -172 43 -66 70
                    -73 268 -73 198 0 225 7 268 73 26 40 27 44 27 197 0 153 -1 157 -27 197 -43
                    66 -70 73 -270 73 -139 0 -179 -4 -206 -17z m381 -34 c26 -14 67 -50 67 -59 0
                    -4 -44 -36 -97 -71 -144 -95 -152 -94 -377 63 -13 8 10 36 49 60 26 15 52 18
                    183 18 94 0 162 -4 175 -11z m-329 -175 c135 -90 177 -90 312 0 46 31 86 56
                    89 56 3 0 5 -53 5 -117 0 -132 -8 -156 -59 -190 -32 -22 -44 -23 -191 -23
                    -147 0 -159 1 -191 23 -51 34 -59 58 -59 190 0 64 2 117 5 117 3 0 43 -25 89
                    -56z"/>
                    </g>
                </svg>
                <span>Messages</span>
                </li>
                <li className="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-calendar"
                    viewBox="0 0 24 24">
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <path d="M16 2v4M8 2v4m-5 4h18" />
                </svg>
                <span>Upcoming</span>
                </li>
                <li className="item">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="feather feather-users">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                <span>Video Conferencing</span>
                </li>
                <li className="item">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
                    preserveAspectRatio="xMidYMid meet">

                    <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                    fill="#000000" stroke="none">
                    <path d="M113 610 c-43 -14 -80 -61 -88 -113 -4 -24 -5 -120 -3 -213 3 -185 9
                    -204 65 -241 24 -16 53 -18 233 -18 180 0 209 2 233 18 57 37 62 55 62 243 0
                    159 -2 175 -21 201 -34 46 -79 63 -170 63 -74 0 -83 2 -124 32 -34 26 -54 32
                    -99 35 -31 1 -70 -2 -88 -7z m168 -72 c37 -30 45 -32 145 -37 97 -6 107 -8
                    124 -31 11 -14 20 -33 20 -42 0 -17 -18 -18 -250 -18 l-250 0 0 54 c0 44 4 58
                    26 80 23 22 35 26 86 26 51 0 64 -4 99 -32z m289 -283 c0 -123 -9 -157 -47
                    -174 -33 -15 -377 -15 -406 1 -42 22 -46 38 -47 166 l0 122 250 0 250 0 0
                    -115z"/>
                    </g>
                </svg>
                <span>File Manager</span>
                </li>
                <li className="item">
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="64.000000pt" height="64.000000pt" viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet">

                <g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M258 609 c-10 -5 -22 -27 -28 -49 -12 -44 -34 -56 -74 -40 -35 13
                -58 1 -91 -48 -32 -46 -32 -73 0 -110 31 -37 31 -47 0 -84 -33 -39 -32 -66 6
                -118 30 -42 32 -42 78 -37 58 7 67 2 83 -48 11 -34 19 -41 51 -49 23 -6 51 -6
                74 0 32 8 40 15 51 49 16 50 25 55 83 48 46 -5 48 -5 78 37 38 52 39 79 6 118
                -31 37 -31 47 0 84 32 37 32 64 0 110 -33 49 -56 61 -91 48 -40 -16 -62 -4
                -74 40 -6 22 -19 44 -30 50 -24 13 -100 12 -122 -1z m114 -76 c12 -46 47 -67
                104 -60 44 5 46 3 62 -29 15 -33 15 -35 -8 -59 -33 -36 -33 -94 0 -130 23 -24
                23 -26 8 -59 -16 -32 -18 -34 -62 -29 -57 7 -92 -14 -104 -60 -8 -30 -11 -32
                -52 -32 -41 0 -44 2 -52 32 -12 46 -47 67 -104 60 -44 -5 -46 -3 -62 29 -15
                33 -15 35 8 59 33 36 33 94 0 130 -23 24 -23 26 -8 59 16 32 18 33 66 28 44
                -4 54 -1 76 21 14 15 26 35 26 45 0 28 10 33 54 30 36 -3 41 -6 48 -35z"/>
                <path d="M261 416 c-69 -38 -67 -162 4 -194 104 -48 201 49 153 153 -22 50
                -104 71 -157 41z m104 -51 c14 -13 25 -33 25 -45 0 -27 -43 -70 -70 -70 -27 0
                -70 43 -70 70 0 27 43 70 70 70 12 0 32 -11 45 -25z"/>
                </g>
                </svg>

                <span>Settings</span>
                </li>
            </ul>
            </div>
        </div>
        <div className="page-content">
            <div className="header">Welcome Sana!</div>
            <div className="projects-section">
                <div className="projects-section-header">
                    <p>Groups</p>
                    <p className="time">March, 15</p>
                </div>
                <div className="projects-section-line">
                    <div className="projects-status">
                    <div className="item-status">
                        <span className="status-number">45</span>
                        <span className="status-type">In Progress</span>
                    </div>
                    <div className="item-status">
                        <span className="status-number">24</span>
                        <span className="status-type">Upcoming</span>
                    </div>
                    <div className="item-status">
                        <span className="status-number">62</span>
                        <span className="status-type">Total Projects</span>
                    </div>
                    </div>
                    <div className="view-actions">
                    <button className="view-btn list-view" title="List View">
                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
                        <line x1={8} y1={6} x2={21} y2={6} />
                        <line x1={8} y1={12} x2={21} y2={12} />
                        <line x1={8} y1={18} x2={21} y2={18} />
                        <line x1={3} y1={6} x2="3.01" y2={6} />
                        <line x1={3} y1={12} x2="3.01" y2={12} />
                        <line x1={3} y1={18} x2="3.01" y2={18} /></svg>
                    </button>
                    <button className="view-btn grid-view active" title="Grid View">
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid">
                        <rect x={3} y={3} width={7} height={7} />
                        <rect x={14} y={3} width={7} height={7} />
                        <rect x={14} y={14} width={7} height={7} />
                        <rect x={3} y={14} width={7} height={7} /></svg>
                    </button>
                    </div>
                </div>
                <div className="project-boxes jsGridView">
                    <div className="project-box-wrapper">
                    <div className="project-box" style={{backgroundColor: '#fee4cb'}}>
                        <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                            <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={5} r={1} />
                                <circle cx={12} cy={19} r={1} /></svg>
                            </button>
                        </div>
                        </div>
                        <div className="project-box-content-header">
                        <p className="box-content-header">Web Designing</p>
                        <p className="box-content-subheader">Group description</p>
                        </div>
                        <div className="project-box-footer">
                        <div className="participants">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant" />
                            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant" />
                            <button className="add-participant" style={{color: '#ff942e'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            </button>
                        </div>
                        <div className="btn join-session" style={{color: '#ff942e'}} onClick={handleNavigate}>
                            Join Session
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="project-box-wrapper">
                    <div className="project-box" style={{backgroundColor: '#e9e7fd'}}>
                        <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                            <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={5} r={1} />
                                <circle cx={12} cy={19} r={1} /></svg>
                            </button>
                        </div>
                        </div>
                        <div className="project-box-content-header">
                        <p className="box-content-header">Testing</p>
                        <p className="box-content-subheader">Group description</p>
                        </div>
                        <div className="project-box-footer">
                        <div className="participants">
                            <img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80" alt="participant" />
                            <img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80" alt="participant" />
                            <button className="add-participant" style={{color: '#4f3ff0'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            </button>
                        </div>
                        <div className="btn join-session" style={{color: '#4f3ff0'}} onClick={handleNavigate}>
                            Join Session
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="project-box-wrapper">
                    <div className="project-box">
                        <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                            <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={5} r={1} />
                                <circle cx={12} cy={19} r={1} /></svg>
                            </button>
                        </div>
                        </div>
                        <div className="project-box-content-header">
                        <p className="box-content-header">Capstone Project</p>
                        <p className="box-content-subheader">Group description</p>
                        </div>
                        <div className="project-box-footer">
                        <div className="participants">
                            <img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant" />
                            <img src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80" alt="participant" />
                            <button className="add-participant" style={{color: '#096c86'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            </button>
                        </div>
                        <div className="btn join-session" style={{color: '#096c86'}} onClick={handleNavigate}>
                            Join Session
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* <div className="project-box-wrapper">
                    <div className="project-box" style={{backgroundColor: '#ffd3e2'}}>
                        <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                            <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={5} r={1} />
                                <circle cx={12} cy={19} r={1} /></svg>
                            </button>
                        </div>
                        </div>
                        <div className="project-box-content-header">
                        <p className="box-content-header">UI Development</p>
                        <p className="box-content-subheader">Group description</p>
                        </div>
                        <div className="project-box-footer">
                        <div className="participants">
                            <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant" />
                            <img src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant" />
                            <button className="add-participant" style={{color: '#df3670'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            </button>
                        </div>
                        <div className="join-session" style={{color: '#df3670'}}>
                            Join Session
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="project-box-wrapper">
                    <div className="project-box" style={{backgroundColor: '#c8f7dc'}}>
                        <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                            <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={5} r={1} />
                                <circle cx={12} cy={19} r={1} /></svg>
                            </button>
                        </div>
                        </div>
                        <div className="project-box-content-header">
                        <p className="box-content-header">Data Analysis</p>
                        <p className="box-content-subheader">Group description</p>
                        </div>
                        <div className="project-box-footer">
                        <div className="participants">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant" />
                            <img src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60" alt="participant" />
                            <button className="add-participant" style={{color: '#34c471'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            </button>
                        </div>
                        <div className="join-session" style={{color: '#34c471'}}>
                            Join Session
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="project-box-wrapper">
                    <div className="project-box" style={{backgroundColor: '#d5deff'}}>
                        <div className="project-box-header">
                        <span>December 10, 2020</span>
                        <div className="more-wrapper">
                            <button className="project-btn-more">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical">
                                <circle cx={12} cy={12} r={1} />
                                <circle cx={12} cy={5} r={1} />
                                <circle cx={12} cy={19} r={1} /></svg>
                            </button>
                        </div>
                        </div>
                        <div className="project-box-content-header">
                        <p className="box-content-header">Web Designing</p>
                        <p className="box-content-subheader">Group description</p>
                        </div>
                        <div className="project-box-footer">
                        <div className="participants">
                            <img src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80" alt="participant" />
                            <img src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80" alt="participant" />
                            <button className="add-participant" style={{color: '#4067f9'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            </button>
                        </div>
                        <div className="join-session" style={{color: '#4067f9'}}>
                            Join Session
                        </div>
                        </div>
                    </div>
                    </div> */}
                </div>
            </div>
            <div className="header">Today Tasks</div>
        <div className="content-categories">
          <div className="label-wrapper">
            <input className="nav-item" name="nav" type="radio" id="opt-1" />
            <label className="category" htmlFor="opt-1">All</label>
          </div>
          <div className="label-wrapper">
            <input className="nav-item" name="nav" type="radio" id="opt-2" defaultChecked />
            <label className="category" htmlFor="opt-2">Important</label>
          </div>
          <div className="label-wrapper">
            <input className="nav-item" name="nav" type="radio" id="opt-3" />
            <label className="category" htmlFor="opt-3">Notes</label>
          </div>
          <div className="label-wrapper">
            <input className="nav-item" name="nav" type="radio" id="opt-4" />
            <label className="category" htmlFor="opt-4">Links</label>
          </div>
        </div>
        <div className="tasks-wrapper">
          <div className="task">
            <input className="task-item" name="task" type="checkbox" id="item-1" defaultChecked />
            <label htmlFor="item-1">
              <span className="label-text">Dashboard Design Implementation</span>
            </label>
            <span className="tag approved">Approved</span>
          </div>
          <div className="task">
            <input className="task-item" name="task" type="checkbox" id="item-2" defaultChecked />
            <label htmlFor="item-2">
              <span className="label-text">Create a userflow</span>
            </label>
            <span className="tag progress">In Progress</span>
          </div>
          <div className="task">
            <input className="task-item" name="task" type="checkbox" id="item-3" />
            <label htmlFor="item-3">
              <span className="label-text">Application Implementation</span>
            </label>
            <span className="tag review">In Review</span>
          </div>
          <div className="task">
            <input className="task-item" name="task" type="checkbox" id="item-4" />
            <label htmlFor="item-4">
              <span className="label-text">Create a Dashboard Design</span>
            </label>
            <span className="tag progress">In Progress</span>
          </div>
          <div className="task">
            <input className="task-item" name="task" type="checkbox" id="item-5" />
            <label htmlFor="item-5">
              <span className="label-text">Create a Web Application Design</span>
            </label>
            <span className="tag approved">Approved</span>
          </div>
          <div className="task">
            <input className="task-item" name="task" type="checkbox" id="item-6" />
            <label htmlFor="item-6">
              <span className="label-text">Interactive Design</span>
            </label>
            <span className="tag review">In Review</span>
          </div>
        </div>
        </div>
        <div className="right-bar">
            <div className="top-part">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="feather feather-users">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            <div className="count">6</div>
            </div>
            <div className="header">Schedule</div>
            <div className="right-content">
            <div className="task-box yellow">
                <div className="description-task">
                <div className="time">08:00 - 09:00 AM</div>
                <div className="task-name">Product Review</div>
                </div>
                <div className="more-button"></div>
                <div className="members">
                <img
                    src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                    alt="member"/>
                <img
                    src="https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80"
                    alt="member-2"/>
                <img
                    src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                    alt="member-3"/>
                <img
                    src="https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                    alt="member-4"/>
                </div>
            </div>
            <div className="task-box blue">
                <div className="description-task">
                <div className="time">10:00 - 11:00 AM</div>
                <div className="task-name">Design Meeting</div>
                </div>
                <div className="more-button"></div>
                <div className="members">
                <img
                    src="https://images.unsplash.com/photo-1484688493527-670f98f9b195?ixlib=rb-1.2.1&auto=format&fit=crop&w=2230&q=80"
                    alt="member"/>
                <img
                    src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                    alt="member-2"/>
                <img
                    src="https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                    alt="member-3"/>
                </div>
            </div>
            <div className="task-box red">
                <div className="description-task">
                <div className="time">01:00 - 02:00 PM</div>
                <div className="task-name">Team Meeting</div>
                </div>
                <div className="more-button"></div>
                <div className="members">
                <img
                    src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                    alt="member"/>
                <img
                    src="https://images.unsplash.com/photo-1475552113915-6fcb52652ba2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80"
                    alt="member-2"/>
                <img
                    src="https://images.unsplash.com/photo-1493752603190-08d8b5d1781d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80"
                    alt="member-3"/>
                <img
                    src="https://images.unsplash.com/photo-1484688493527-670f98f9b195?ixlib=rb-1.2.1&auto=format&fit=crop&w=2230&q=80"
                    alt="member-4"/>
                </div>
            </div>
            <div className="task-box green">
                <div className="description-task">
                <div className="time">03:00 - 04:00 PM</div>
                <div className="task-name">Release Event</div>
                </div>
                <div className="more-button"></div>
                <div className="members">
                <img
                    src="https://images.unsplash.com/photo-1523419409543-a5e549c1faa8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=943&q=80"
                    alt="member"/>
                <img
                    src="https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=881&q=80"
                    alt="member-2"/>
                <img
                    src="https://images.unsplash.com/photo-1521122872341-065792fb2fa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2208&q=80"
                    alt="member-3"/>
                <img
                    src="https://images.unsplash.com/photo-1486302913014-862923f5fd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=3400&q=80"
                    alt="member-4"/>
                <img
                    src="https://images.unsplash.com/photo-1484187216010-59798e9cc726?ixlib=rb-1.2.1&auto=format&fit=crop&w=955&q=80"
                    alt="member-5"/>
                </div>
            </div>
            <div className="task-box blue">
                <div className="description-task">
                <div className="time">08:00 - 09:00 PM</div>
                <div className="task-name">Release Event</div>
                </div>
                <div className="more-button"></div>
                <div className="members">
                <img
                    src="https://images.unsplash.com/photo-1523419409543-a5e549c1faa8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=943&q=80"
                    alt="member"/>
                <img
                    src="https://images.unsplash.com/photo-1519742866993-66d3cfef4bbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=881&q=80"
                    alt="member-2"/>
                <img
                    src="https://images.unsplash.com/photo-1521122872341-065792fb2fa0?ixlib=rb-1.2.1&auto=format&fit=crop&w=2208&q=80"
                    alt="member-3"/>
                <img
                    src="https://images.unsplash.com/photo-1486302913014-862923f5fd48?ixlib=rb-1.2.1&auto=format&fit=crop&w=3400&q=80"
                    alt="member-4"/>
                <img
                    src="https://images.unsplash.com/photo-1484187216010-59798e9cc726?ixlib=rb-1.2.1&auto=format&fit=crop&w=955&q=80"
                    alt="member-5"/>
                </div>
            </div>
            <div className="task-box yellow">
                <div className="description-task">
                <div className="time">11:00 - 12:00 PM</div>
                <div className="task-name">Practise</div>
                </div>
                <div className="more-button"></div>
                <div className="members">
                <img
                    src="https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                    alt="member"/>
                <img
                    src="https://images.unsplash.com/photo-1476657680631-c07285ff2581?ixlib=rb-1.2.1&auto=format&fit=crop&w=2210&q=80"
                    alt="member-2"/>
                <img
                    src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80"
                    alt="member-3"/>
                <img
                    src="https://images.unsplash.com/photo-1455504490126-80ed4d83b3b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                    alt="member-4"/>
                </div>
            </div>
            </div>
        </div>
        </div>
  );
}