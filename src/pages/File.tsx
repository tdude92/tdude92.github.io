import { useContext, useState } from "react";
import { Rnd } from "react-rnd";
import { TbFolderFilled } from "react-icons/tb";
import styled from "styled-components";
import { ThemeContext } from "./ThemeProvider";
import { Theme } from "@/util/Theme";

const FileDiv = styled.div<{ $theme: Theme }>`
  width: 80px;
  height: 80px;

  &:hover {
    background-color: ${(props) => props.$theme.fileTheme.highlightColor};
    cursor: pointer;
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;
`;

const FileIcon = styled(TbFolderFilled)<{ $theme: Theme }>`
  color: ${(props) => props.$theme.fileTheme.iconColor.getStyle()};
`;

const FileName = styled.div<{ $theme: Theme }>`
  color: ${(props) => props.$theme.fileTheme.nameColor.getStyle()};
`;

interface FileProps {
  fileName: string;
  x: number;
  y: number;
  onDoubleClick: () => void;
}

export default function File(props: FileProps) {
  const { theme } = useContext(ThemeContext);

  const [filePositionX, setFilePositionX] = useState(props.x);
  const [filePositionY, setFilePositionY] = useState(props.y);

  return (
    <Rnd
      position={{ x: filePositionX, y: filePositionY }}
      onDragStop={(e, d) => {
        setFilePositionX(d.x);
        setFilePositionY(d.y);
      }}
      enableResizing={false}
    >
      <FileDiv $theme={theme} onDoubleClick={props.onDoubleClick}>
        <FileIcon $theme={theme} size="60px" />
        <FileName $theme={theme}>{props.fileName}</FileName>
      </FileDiv>
    </Rnd>
  );
}
