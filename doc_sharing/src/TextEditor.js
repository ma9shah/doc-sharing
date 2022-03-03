import { useEffect, React, useRef, useState, useCallback } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import './TextEditor.css'
import { io } from 'socket.io-client';
import { useLinkClickHandler, useParams } from "react-router-dom";


export default function TextEditor() {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const { id: documentId } = useParams()
  const [username, setUsername] = useState()
  var [text, setText] = useState()

  useEffect(() => {
    const socket_instance = io("http://localhost:3003")
    setSocket(socket_instance)
    setUsername("sana");
    socket_instance.on('data', data=>{
      setText(data);
      console.log('cient ', data);
    })    

    return () => {
      // socket_instance.disconnect()
      // socket.disconnect()
    }
  }, [])

  // const wrapperRef = useCallback(wrapper => {
  //   if (wrapper == null) return
  //   // wrapper.innerHTML = ""
  //   const editor = document.createElement("div")
  //   wrapper.append(editor)
  //   const q = new Quill(editor, {
  //     theme: "snow",
  //   })
  //   setQuill(q)
  // }, [])

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
    if(text!=undefined)
      quill.setText(text);  
  },[text])

  useEffect(() => {
    if (socket == null || quill == null) return
    // if(text!=undefined){
    //   console.log('updae',text)
    //   // quill.updateContents(text)
    //   quill.setText(text)
    // }
    // var updated = quill.getText();
    // console.log('updated text', updated )
    const handler = delta => {
      quill.updateContents(delta)
      var updatedText = quill.getText();
      socket.emit('updateChanges', username, updatedText);

    }
    socket.on("accept-new-changes", handler)
    
    return () => {
      socket.off("accept-new-changes", handler)
    }
  }, [socket, quill, text])


  useEffect(() => {
    console.log("here")
    if (socket == null || quill == null) return
    socket.emit('getUserInfo', username);
    const handler = (delta, oldDelta, source) => {      
      if (source !== "user") return
      socket.emit("send-changes", delta)
      console.log('changes emited: ', delta)
      // setText(quill.getText());
      // console.log(quill.getText())
      // var updatedText = quill.getText();
      // if(updatedText != text){
      //   socket.emit('updateChanges', username, updatedText);
      //   // quill.setText(updatedText);
      // }
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill, username])

  // useEffect(() => {
  //   if (socket == null || quill == null) return

  //   socket.once("load-document", document => {
  //     quill.setContents(document)
  //     quill.enable()
  //   })

  //   socket.emit("get-document", documentId)
  // }, [socket, quill, documentId])

  return (
    <div className="container" ref={wrapperRef}>

    </div>
  )
}
