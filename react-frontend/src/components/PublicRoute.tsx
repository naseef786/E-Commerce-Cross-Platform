import { type ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (user) {
      navigate("/"); 
    }
  }, [user, navigate]);

  // If user is logged in, component renders null until redirect
  if (user) return null;

  return <>{children}</>;
}
