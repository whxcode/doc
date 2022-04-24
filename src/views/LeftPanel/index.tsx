import * as React from "react";

import FileSearch from "./FileSearch";
import FileList from "./FileList";
import { IFileItem } from "../../utils/defaultFiles";

import { faPlus, faFileImport } from "@fortawesome/free-solid-svg-icons";

import Button from "../Bottom";

interface IProps {
  files: IFileItem[];

  onImport: () => void;
  onSaveEdit: (id: string, title: string, isNew: boolean) => void;
  onFileClick: (id: string) => void;
  handleUpdateFileName: (id: string, title: string) => void;
  onChange: (value: string) => void;
  onFileDelete: (id: string) => void;
  createNewFile: () => void;
}

const LeftPanel = ({
  files,
  onFileDelete,
  onSaveEdit,
  onFileClick,
  onChange,
  createNewFile,
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
            onBtnClick={createNewFile}
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
