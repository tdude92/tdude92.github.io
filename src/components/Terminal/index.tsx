import { useMemo } from "react";
import Window from "@/components/Window";
import { TerminalWindowState } from "@/components/WindowManager";
import TerminalBody from "./TerminalBody";

interface TerminalProps {
  state: TerminalWindowState;
}

export default function Terminal(props: TerminalProps) {
  const { app } = props.state;
  const data = useMemo(() => app.terminal(), [app]);

  return (
    <Window state={props.state} title="trevor@PersonalSite: ~">
      <TerminalBody data={data} />
    </Window>
  );
}
