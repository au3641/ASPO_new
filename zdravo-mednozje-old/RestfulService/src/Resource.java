import javax.ws.rs.GET;
import javax.ws.rs.Path;

/**
 * Created by Toni on 29.3.2015
 */

@Path("/randomNumber")
public class Resource {

    @GET
    public String get() {
        return String.valueOf(Math.random());
    }
}
