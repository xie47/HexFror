package net

import akka.actor.{ Actor, ActorRef, Props }
import akka.io.{ IO, Tcp }
import akka.util.ByteString
import java.net.InetSocketAddress



class TCPServer extends Actor{
  import Tcp._
  import context.system

  IO(Tcp) ! Bind(self, new InetSocketAddress("localhost", 0))

  def receive = {
    case b @ Bound(localAddress) ?
      context.parent ! b

    case CommandFailed(_: Bind) ? context stop self

    case c @ Connected(remote, local) ?
      val handler = context.actorOf(Props[ClientProxy])
      val connection = sender()
      connection ! Register(handler)
  }
}

