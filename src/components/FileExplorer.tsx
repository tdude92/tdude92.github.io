import { useContext, useState } from "react";
import styled from "styled-components";
import { TbChevronLeft } from "react-icons/tb";
import { App, appearance, FolderApp } from "@/apps";
import Window from "@/components/Window";
import { ThemeContext } from "@/components/ThemeProvider";
import { ExplorerWindowState, WindowContext } from "@/components/WindowManager";
import { CWDTextSpan, UsernameTextSpan } from "@/styles/TerminalStyle";
import { Theme } from "@/util/Theme";

const dividerColor = (theme: Theme) =>
  theme.terminalTheme.bodyTextHighlightColor.getStyle();
// Marks the current folder in the sidebar.
const activeColor = dividerColor;
const hoverColor = (theme: Theme) => theme.fileTheme.highlightColor;

const Body = styled.div<{ $theme: Theme }>`
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  background-color: ${(props) =>
    props.$theme.terminalTheme.bodyBackgroundColor.getStyle()};
  color: ${(props) => props.$theme.terminalTheme.bodyTextColor.getStyle()};
  font-size: 13.5pt;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: inherit;
  font: inherit;
  cursor: pointer;
`;

const Toolbar = styled.div<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-bottom: 1px solid ${(props) => dividerColor(props.$theme)};
`;

const UpButton = styled(Button)<{ $theme: Theme }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 6px;

  &:hover:enabled {
    background-color: ${(props) => hoverColor(props.$theme)};
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
`;

const Location = styled.div<{ $theme: Theme }>`
  flex: 1;
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0px 8px;
  border: 1px solid ${(props) => dividerColor(props.$theme)};
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
`;

const Crumb = styled(Button)<{ $theme: Theme }>`
  padding: 0px 2px;
  border-radius: 4px;

  &:hover {
    background-color: ${(props) => hoverColor(props.$theme)};
  }
`;

const Main = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
`;

const Sidebar = styled.nav<{ $theme: Theme }>`
  width: 170px;
  flex-shrink: 0;
  padding: 10px 8px;
  border-right: 1px solid ${(props) => dividerColor(props.$theme)};
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const SidebarItem = styled(Button)<{
  $theme: Theme;
  $active: boolean;
  $depth: number;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px 6px ${(props) => 8 + props.$depth * 14}px;
  border-radius: 6px;
  text-align: left;
  background-color: ${(props) =>
    props.$active ? activeColor(props.$theme) : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.$active ? activeColor(props.$theme) : hoverColor(props.$theme)};
  }
`;

const Grid = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 112px);
  align-content: start;
  gap: 8px;
`;

const Item = styled(Button)<{ $theme: Theme; $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 4px;
  border-radius: 8px;

  // Same highlights as desktop icons: hovered, selected, and selected and
  // hovered each look different.
  background-color: ${(props) =>
    props.$selected ? props.$theme.fileTheme.selectedColor : "transparent"};
  box-shadow: ${(props) =>
    props.$selected ? "inset 0 0 0 1px rgba(255, 255, 255, 0.35)" : "none"};

  &:hover {
    background-color: ${(props) =>
      props.$selected
        ? props.$theme.fileTheme.selectedHoverColor
        : hoverColor(props.$theme)};
  }
`;

const ItemName = styled.span`
  font-size: 12pt;
  line-height: 1.2;
  text-align: center;
`;

const StatusBar = styled.div<{ $theme: Theme }>`
  display: flex;
  justify-content: space-between;
  padding: 6px 16px;
  border-top: 1px solid ${(props) => dividerColor(props.$theme)};
  font-size: 11pt;
`;

// Every folder under the root, depth first, as the path to reach it.
function folderPaths(root: FolderApp): FolderApp[][] {
  const paths: FolderApp[][] = [];
  const walk = (path: FolderApp[]) => {
    paths.push(path);
    for (const child of path[path.length - 1].children) {
      if (child.type === "folder") {
        walk([...path, child]);
      }
    }
  };
  walk([root]);
  return paths;
}

interface FileExplorerProps {
  state: ExplorerWindowState;
}

export default function FileExplorer(props: FileExplorerProps) {
  const { theme } = useContext(ThemeContext);
  const { openApp, navigate } = useContext(WindowContext);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { id, path } = props.state;
  const folder = path[path.length - 1];
  const iconColor = theme.fileTheme.iconColor.getStyle();

  const goTo = (newPath: FolderApp[]) => {
    setSelectedId(null);
    navigate(id, newPath);
  };

  const open = (app: App) => {
    if (app.type === "folder") {
      goTo([...path, app]);
    } else {
      openApp(app, path);
    }
  };

  const selected = folder.children.find((app) => app.id === selectedId);
  const itemCount = folder.children.length;

  return (
    <Window state={props.state} title={folder.name}>
      <Body $theme={theme}>
        <Toolbar $theme={theme}>
          <UpButton
            $theme={theme}
            aria-label="Go to parent folder"
            disabled={path.length === 1}
            onClick={() => goTo(path.slice(0, -1))}
          >
            <TbChevronLeft size="1.3em" />
          </UpButton>
          <Location $theme={theme}>
            <UsernameTextSpan $theme={theme}>
              trevor@PersonalSite
            </UsernameTextSpan>
            :
            {path.map((f, i) => (
              <CWDTextSpan key={f.id} $theme={theme}>
                {i > 0 && "/"}
                <Crumb
                  $theme={theme}
                  onClick={() => goTo(path.slice(0, i + 1))}
                >
                  {i === 0 ? "~" : f.name}
                </Crumb>
              </CWDTextSpan>
            ))}
          </Location>
        </Toolbar>

        <Main>
          <Sidebar $theme={theme}>
            {folderPaths(path[0]).map((p) => {
              const f = p[p.length - 1];
              return (
                <SidebarItem
                  key={f.id}
                  $theme={theme}
                  $active={f.id === folder.id}
                  $depth={p.length - 1}
                  onClick={() => goTo(p)}
                >
                  <f.icon size="1.1em" color={iconColor} />
                  {f.name}
                </SidebarItem>
              );
            })}
          </Sidebar>

          <Grid
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedId(null);
            }}
          >
            {folder.children.map((app) => {
              const { name, icon: Icon } = appearance(app, theme);
              return (
                <Item
                  key={app.id}
                  $theme={theme}
                  $selected={app.id === selectedId}
                  onClick={() => setSelectedId(app.id)}
                  onDoubleClick={() => open(app)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") open(app);
                  }}
                >
                  <Icon size="48px" color={iconColor} />
                  <ItemName>{name}</ItemName>
                </Item>
              );
            })}
          </Grid>
        </Main>

        <StatusBar $theme={theme}>
          <span>
            {selected
              ? `"${appearance(selected, theme).name}" selected`
              : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
          </span>
          <span>Double-click to open</span>
        </StatusBar>
      </Body>
    </Window>
  );
}
