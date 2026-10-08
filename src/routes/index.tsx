import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/folio/Portfolio";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Portfolio />;
}
