import { useNavigate } from "react-router-dom";
import { logUserOut } from "../apollo";

function Home() {
    const navigate = useNavigate();
    return (
        <div>
        <h1>Welcome to Nomad Coffee</h1>
        <button onClick={() => logUserOut(navigate)}>Logout</button>
        </div>
    );
}
export default Home;