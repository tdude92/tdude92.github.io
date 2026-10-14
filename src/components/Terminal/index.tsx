import Window from "@/components/Window";
import { TerminalWindowState } from "@/components/WindowManager";
import TerminalBody from "./TerminalBody";

interface TerminalProps {
  state: TerminalWindowState;
}

export default function Terminal(props: TerminalProps) {
  return (
    <Window state={props.state} title="trevor@PersonalSite: ~">
      <TerminalBody data={props.state.data} />
    </Window>
  );
}
