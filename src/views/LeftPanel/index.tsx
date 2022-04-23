import React from "react";

import FileSearch from "./FileSearch";
import FileList from "./FileList";
import { IFileItem } from "../../utils/defaultFiles";

import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";

import Button from "../Bottom";

interface IProps {
  files: IFileItem[];

  onAdd: () => void;
  onImport: () => void;
  onSaveEdit: (id: string) => void;
  onFileClick: (id: string) => void;
  handleUpdateFileName: (id: string, title: string) => void;
  onChange: (value: string) => void;
  onFileDelete: (id: string) => void;
}

const LeftPanel = ({
  files,
  onFileDelete,
  onSaveEdit,
  onFileClick,
  onChange,
  onAdd,
  onImport,
}: IProps) => {
  return (
    <div>
      <FileSearch title="你在干嘛" onFileSearch={onChange} />
      <FileList
        files={files}
        onFileClick={onFileClick}
        onFileDelete={onFileDelete}
        onSaveEdit={onSaveEdit}
      />

      <div className="row no-gutters">
        <div className="col">
          <Button
            text={"新建"}
            colorClass="btn-primary"
            icon={faPlus}
            onBtnClick={onAdd}
          />
        </div>

        <div className="col">
          <Button
            text={"导入"}
            colorClass="btn-success"
            icon={faFileImport}
            onBtnClick={onImport}
          />
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
