import { useEffect, React, useRef, useState, useCallback } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import './TextEditor.css'
import { io } from 'socket.io-client';
import { useParams } from "react-router-dom";





export default function TextEditor() {
  const [socket, setSocket] = useState()
  const [quill, setQuill] = useState()
  const { docId } = useParams()

  useEffect(() => {
    const socket_instance = io("http://localhost:3003")
    setSocket(socket_instance)

    return () => {
      // socket_instance.disconnect()
      if(socket){
        socket.disconnect()
      }
    }
  }, [])

  useEffect(()=>{
    if(socket == null || quill == null) return
    socket.emit('docId-change', docId)
    socket.on('updated-docId', content => {
      console.log(content)
      quill.setContents(content)
    })
    console.log("new docID", docId)
  }, [docId, socket, quill])
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
      const q = new Quill(editor, {theme: "snow"})
      // q.disable()
      // q.setText("Loading...")
      setQuill(q)

  return () => {
      wrapperRef.innerHTML = ""
  }
  },[])

  useEffect(() => {
    if (socket == null || quill == null) return
    const handler = delta => {
      quill.updateContents(delta)
    }
    socket.on("accept-new-changes", handler)

    return () => {
      socket.off("accept-new-changes", handler)
    }
  }, [socket, quill])


  useEffect(() => {
    // console.log("here")
    if (socket == null || quill == null) return

    const handler = (delta, oldDelta, source) => {      
      if (source !== "user") return
      socket.emit("send-changes", delta)
      console.log('changes emited: ', delta)
    }
    quill.on("text-change", handler)

    return () => {
      quill.off("text-change", handler)
    }
  }, [socket, quill])

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
