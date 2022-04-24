import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faMarkdown } from "@fortawesome/free-brands-svg-icons";
import useKeyPress from "../../hooks/useKeyPress";
import useContextMenu from "../../hooks/useContextMenu";
import { getParentNode } from "../../utils/helper";

import { IFileItem } from "../../utils/defaultFiles";

interface IProps {
  files: IFileItem[];
  onFileClick: (id: string) => void;
  onFileDelete: (id: string) => void;
  onSaveEdit: (id: string, title: string, isNew: boolean) => void;
}

const FileList = ({ files, onFileClick, onSaveEdit, onFileDelete }: IProps) => {
  const [editStatus, setEditStatus] = useState("");
  const [value, setValue] = useState("");
  let node = useRef(null);
  const enterPressed = useKeyPress(13);
  const escPressed = useKeyPress(27);
  const closeSearch = (editItem: IFileItem) => {
    setEditStatus("");
    setValue("");
    // if we are editing a newly created file, we should delete this file when pressing esc
    if (editItem.isNew) {
      onFileDelete(editItem.id);
    }
  };

  const clickedItem = useContextMenu(
    [
      {
        label: "打开",
        click: () => {
          const parentElement = getParentNode(clickedItem.current, "file-item");
          if (parentElement) {
            onFileClick(parentElement.dataset.id);
          }
        },
      },
      {
        label: "重命名",
        click: () => {
          const parentElement = getParentNode(clickedItem.current, "file-item");
          if (parentElement) {
            const { id, title } = parentElement.dataset;
            setEditStatus(id);
            setValue(title);
          }
        },
      },
      {
        label: "删除",
        click: () => {
          const parentElement = getParentNode(clickedItem.current, "file-item");
          if (parentElement) {
            onFileDelete(parentElement.dataset.id);
          }
        },
      },
    ],
    ".file-list",
    [files]
  );

  useEffect(() => {
    const editItem = files.find((file) => file.id === editStatus);

    if (enterPressed && editStatus && value.trim() !== "") {
      onSaveEdit(editItem.id, value, editItem.isNew);
      setEditStatus("");
      setValue("");
    }

    if (escPressed && editStatus) {
      closeSearch(editItem);
    }
  });

  useEffect(() => {
    const newFile = files.find((file) => file.isNew);
    if (newFile) {
      setEditStatus(newFile.id);
      setValue(newFile.title);
    }
  }, [files]);

  useEffect(() => {
    if (editStatus) {
      node.current.focus();
    }
  }, [editStatus]);

  return (
    <ul className="list-group list-group-flush file-list">
      {files.map((file) => (
        <li
          className="list-group-item bg-light row d-flex align-items-center file-item mx-0"
          key={file.id}
          data-id={file.id}
          data-title={file.title}
        >
          {file.id !== editStatus && !file.isNew && (
            <>
              <span className="col-2">
                <FontAwesomeIcon size="lg" icon={faMarkdown} />
              </span>
              <span
                className="col-10 c-link"
                onClick={() => {
                  onFileClick(file.id);
                }}
              >
                {file.title}
              </span>
            </>
          )}
          {(file.id === editStatus || file.isNew) && (
            <>
              <input
                className="form-control col-10"
                ref={node}
                value={value}
                placeholder="请输入文件名称"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />
              <button
                type="button"
                className="icon-button col-2"
                onClick={() => {
                  closeSearch(file);
                }}
              >
                <FontAwesomeIcon title="关闭" size="lg" icon={faTimes} />
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default FileList;
