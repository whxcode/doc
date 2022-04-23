import React from "react";

import TabList from "./TabList";

import SimpleMDE from "react-simplemde-editor";
import { IFileItem } from "../../utils/defaultFiles";

import "easymde/dist/easymde.min.css";

interface IProps {
  activeFileID: string;

  unsavedFileIDS: string[];
  openedFiles: IFileItem[];
  files: IFileItem[];

  onCloseTab: (id: string) => void;
  onTabClick: (id: string) => void;
  onChange: (id: string, value: string) => void;
}

const RightPanel = ({
  activeFileID,
  files,
  unsavedFileIDS,
  openedFiles,

  onTabClick,
  onCloseTab,
  onChange,
}: IProps) => {
  const activeFile = files.find((f) => f.id === activeFileID);
  return (
    <div>
      {!activeFileID ? (
        <div className="start-page">请打开文件</div>
      ) : (
        <>
          <TabList
            activeId={activeFileID}
            files={openedFiles}
            unsaveIds={unsavedFileIDS}
            onCloseTab={onCloseTab}
            onTabClick={onTabClick}
          />

          <SimpleMDE
            value={activeFile?.body ?? ""}
            options={{
              direction: "rtl",
            }}
            onChange={(value) => {
              onChange(activeFileID, value);
            }}
          />
        </>
      )}
    </div>
  );
};

export default RightPanel;
