package net

import akka.actor.ActorRef

/**
  *
  * @Author: xieshiqiang 
  * @Date: 2018/12/7 16:10
  * @Description:
  **/
class Proxy {
  var sender:ActorRef
  var session:String
  var msg:MessageClass


  def init(sender:ActorRef, msg:String) = {
    this.sender = sender;
    this.
  }
}
