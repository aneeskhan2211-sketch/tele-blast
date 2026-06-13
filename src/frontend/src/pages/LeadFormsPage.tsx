import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// Lead Forms removed — redirect to dashboard
export default function LeadFormsPage() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/dashboard", replace: true });
  }, [navigate]);
  return null;
}
