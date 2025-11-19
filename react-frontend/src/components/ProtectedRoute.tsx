import {  useEffect, type ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: Props) {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    if (requireAdmin && user?.role !== "admin") navigate("/");
  }, [user, navigate, requireAdmin]);

  if (!user || (requireAdmin && user.role !== "admin")) return null;
  return <>{children}</>;
}
