import { useDeck } from "@/lib/deck-store";
import { Handout } from "./Handout";
import { Lobby } from "./Lobby";
import { Overview } from "./Overview";
import { PresentView } from "./PresentView";

export function DeckApp() {
  const mode = useDeck((s) => s.mode);
  if (mode === "overview") return <Overview />;
  if (mode === "handout") return <Handout />;
  if (mode === "present") return <PresentView />;
  return <Lobby />;
}
