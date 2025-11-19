import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <nav>
      <Link to="/">Home</Link>{" | "}
      {!user && <Link to="/login">Login</Link>}
      {user?.role === "admin" && <> | <Link to="/manage">Manage</Link></>}
      {user && <> | <button onClick={() => dispatch(logout())}>Logout</button></>}
    </nav>
  );
}
