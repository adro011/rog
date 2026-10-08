import { createFileRoute } from "@tanstack/react-router";
import { Admin } from "@/components/folio/Admin";

export const Route = createFileRoute("/admin")({ component: AdminPage });

function AdminPage() {
  return <Admin />;
}
