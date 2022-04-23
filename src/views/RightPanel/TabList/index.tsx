import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { IFileItem } from "../../utils/defaultFiles";

import "./TabList.scss";

interface IProps {
  activeId: string;

  files: IFileItem[];

  onTabClick: (id: string) => void;
  onCloseTab: (id: string) => void;

  unsaveIds?: string[];
}

const TabList = ({
  files,
  activeId,
  unsaveIds,
  onTabClick,
  onCloseTab,
}: IProps) => {
  return (
    <ul className="nav nav-pills tablist-component">
      {files.map((file) => {
        const withUnsavedMark = unsaveIds.includes(file.id);
        const fClassName = classNames({
          "nav-link": true,
          active: file.id === activeId,
          withUnsaved: withUnsavedMark,
        });
        return (
          <li className="nav-item" key={file.id}>
            <a
              href="#"
              className={fClassName}
              onClick={(e) => {
                e.preventDefault();
                onTabClick(file.id);
              }}
            >
              {file.title}
              <span
                className="ml-2 close-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(file.id);
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
              {withUnsavedMark && (
                <span className="rounded-circle ml-2 unsaved-icon"></span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TabList;
