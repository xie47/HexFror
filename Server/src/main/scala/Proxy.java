import akka.actor.ActorRef;
import net.MessageClass;

/**
 * @Author: xieshiqiang
 * @Date: 2018/12/7 16:32
 * @Description:
 **/
public class Proxy {
    private ActorRef sender;
    private MessageClass msg;
    private String session;
    private String originalMsg;

}
