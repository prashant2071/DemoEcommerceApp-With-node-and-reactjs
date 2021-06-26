import React, { Component } from 'react'
import './message.component.css'
import * as io from 'socket.io-client'
import { relativeTime } from '../../../utilities/dateTimeUtilities/datetime.util';
import Button from 'react-bootstrap/Button'
import {notify} from './../../../utilities/notify'
const socket_URL=process.env.REACT_APP_SOCKET_URL;

export  class Messages extends Component {
    constructor(props) {
        super(props)    
        this.state = { 
            messageBody:{
                message:'',
                senderName:'',
                senderId:'',
                recieverName:'',
                recieverId:'',
                time:''
            },
            messages:[],
            users:[]
             
        }
    }
    componentDidMount =  () =>{
        this.socket = io(socket_URL)
        this.currentUser=JSON.parse(localStorage.getItem("user"))
        console.log('socket url is',socket_URL)
        this.runSocket()
    }

    runSocket = () =>{
        this.socket.emit('new-user',this.currentUser.username)
        this.socket.on('reply-message-own',(data) =>{
            console.log('helo world data',data)
            const {messages} =this.state
            messages.push(data)
            this.setState({
                messages
            })
            
        })
        this.socket.on('reply-message',(data) =>{
            console.log('helo world data',data)
            //swap sender and reciever whenever reciever recive message
            const {messages,messageBody} =this.state
            messageBody.recieverId=data.senderId
            messages.push(data)
            this.setState({
                messages,
                messageBody
            })
            
        })
        this.socket.on('users',(data) =>{
            this.setState((preState)=>({
                ...preState.users,
                users:data
            }))
        })
    }
    handleChange = (e) =>{
        const {name,value} =e.target
        this.setState(preState =>({
            messageBody:{
                ...preState.messageBody,
                [name]:value

            }
        }))
    }

    selectUser = (user) =>{
        console.log('selected user is ',user)
        this.setState((preState)=>({
            messageBody:{
                ...preState.messageBody,
                recieverId:user.id,
                recieverName:user.name
            }
        }))
    }

    send = (e) =>{
        e.preventDefault();
        const {messageBody,users}=this.state
        //message body with approriate value
        if(!messageBody.recieverId){
            return  notify.showInfo('please select user to continue')
        }
        messageBody.time=Date.now()
        messageBody.senderName=this.currentUser.firstName 
        const sender=users.find((user,index)=>user.name===this.currentUser.username)
        //socket 
        messageBody.senderId=sender.id
        this.socket.emit('new-message',messageBody)
        this.setState((preState)=>({
            messageBody:{
                ...preState.messageBody,
                message:''
            }
        }))

    }
    

    render() {
        return (
            <>
                <h3>Messages</h3>
                <p>Let's Chat</p>
                <div className="row">
                <div className="col-md-6">
                    <ins>Messages</ins>
                    <div className="chat-box">
                        {this.state.messages.map((msg,index) =>(
                            <div key={index}>
                                <h4>{msg.senderName}</h4>
                                <p>{msg.message}</p>
                                <small>{relativeTime(msg.time,'second')}</small>
                            </div>
                        ))}
                    </div>
                    <form className='form-group' onSubmit={this.send}>
                        <input type="text" name="message" value={this.state.messageBody.message} placeholder="your message here " className="form-control input-box" onChange={this.handleChange}></input>
                        <button className="btn btn-primary" style={{marginLeft:"2px"}}>send</button>
                    </form>
                    </div>
                    <div>
                        <div className="col-md-6">
                            <ins>Users</ins>
                            <div className="chat-box">
                                {this.state.users.map((user,index)=>(
                                    <React.Fragment key={index}>
                                    <Button variant="success" onClick={() =>this.selectUser(user)}>{user.name}</Button>{' '}
                                    <br/>
                                    <br/>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                
                </div>
                
            </>
        )
    }
}
