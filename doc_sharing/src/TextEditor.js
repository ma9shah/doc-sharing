import { useEffect, React, useRef, useState, useCallback } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import './TextEditor.css'
import { io } from 'socket.io-client';
import { useLinkClickHandler, useParams, useLocation } from "react-router-dom";


export default function TextEditor() {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const { id: documentId } = useParams()
  const [username, setUsername] = useState()
  var [text, setText] = useState()
  const location = useLocation()

  useEffect(() => {
    const socket_instance = io("http://localhost:3003")
    setSocket(socket_instance)
    // setUsername("sana");
    socket_instance.on('data', data=>{
      setText(data[0].data);
      console.log('cient ', data[0].data);
    })    

    return () => {
      // socket_instance.disconnect()
      // socket.disconnect()
    }
  }, [])

  const wrapperRef = useRef()
  useEffect(()=>{
      const editor = document.createElement('div')
      wrapperRef.current.append(editor)
      var q = new Quill(editor, {theme: "snow"})
      // socket.emit('getUserInfo', username);
      // q.setText(text);
      // q.disable()
      // if(text !=null) q.setText(text)
      // q.setText("abc")
      // if(text!=undefined) q.setText(text)
      setQuill(q)

  return () => {
    wrapperRef.innerHTML = ""
  }
  },[])

  useEffect(()=>{
    if(text!=undefined){
      console.log("updating text", text);
      quill.setText(text);
    }  
  },[text])

  useEffect(() => {
    if (socket == null || quill == null) return
    const handler = delta => {
      quill.updateContents(delta)
      var updatedText = quill.getText();
      console.log("new text", updatedText);
      socket.emit('updateFile', location.state.id, updatedText);
      // socket.emit('updateChanges', username, updatedText);

    }
    socket.on("accept-new-changes", handler)
    
    return () => {
      socket.off("accept-new-changes", handler)
    }
  }, [socket, quill, text])


  useEffect(() => {
    console.log("here")
    if (socket == null || quill == null) return
    socket.emit('getFileData', location.state.id);
    // socket.emit('getUserInfo', username);
    const handler = (delta, oldDelta, source) => {      
      if (source !== "user") return
      socket.emit("send-changes", delta)
      var updatedText = quill.getText();
      console.log("new text", updatedText);
      socket.emit('updateFile', location.state.id, updatedText);
      console.log('changes emited: ', delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill, username])


  return (
    <div className="container" ref={wrapperRef}>

    </div>
  )
}
