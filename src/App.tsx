import React from "react";

import LeftPanel from "./views/LeftPanel";
import RightPanel from "./views/RightPanel";

import defaultFiles from "./utils/defaultFiles";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

export default function App() {
  const [keyword, setKeyword] = React.useState("");
  const [files, setFiles] = React.useState(defaultFiles);
  const [activeFileID, setActionFileID] = React.useState("");
  const [openedFileIDS, setOpenedFileIDS] = React.useState<string[]>([]);
  const [unsavedFileIDS, setUnsavedFileIDS] = React.useState<string[]>([]);

  const openedFiles = openedFileIDS.map((id) => {
    return files.find((f) => f.id === id);
  });

  const handleSearchChange = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleFileDelete = (id: string) => {
    setFiles(files.filter((f) => f.id !== id));
    handleCloseTab(id);
  };

  const handleSaveEdit = (id: string) => {};
  const handleFileClick = (id: string) => {
    setActionFileID(id);
    setOpenedFileIDS([...new Set([id, ...openedFileIDS])]);
  };

  const handleAdd = () => {};
  const handleImport = () => {};

  const handleTabClick = (id: string) => {
    setActionFileID(id);
  };

  const handleCloseTab = (id: string) => {
    const s = new Set([...openedFileIDS]);
    s.delete(id);

    const ids = [...s];

    if (id === activeFileID && ids.length !== 0) {
      setActionFileID(ids[0]);
    }

    setOpenedFileIDS(ids);
  };

  const handleEditorChange = (id: string, value: string) => {
    handleFileChange(id, value, "body");
    if (!unsavedFileIDS.includes(id)) {
      setUnsavedFileIDS([...unsavedFileIDS, id]);
    }
  };

  const handleFileChange = (
    id: string,
    value: string,
    key: "body" | "title"
  ) => {
    setFiles(
      files.map((file) => {
        if (file.id === id) {
          file[key] = value;
        }
        return file;
      })
    );
  };

  const handleUpdateFileName = (id: string, value: string) => {
    handleFileChange(id, value, "title");
  };

  const fs = React.useMemo(() => {
    return keyword.length
      ? files.filter((f) => f.title.includes(keyword))
      : files;
  }, [keyword]);

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 px-0">
          <LeftPanel
            files={fs}
            onAdd={handleAdd}
            onSaveEdit={handleSaveEdit}
            onFileDelete={handleFileDelete}
            onFileClick={handleFileClick}
            onChange={handleSearchChange}
            onImport={handleImport}
            handleUpdateFileName={handleUpdateFileName}
          />
        </div>

        <div className="col-9 px-0">
          <RightPanel
            files={files}
            activeFileID={activeFileID}
            openedFiles={openedFiles}
            unsavedFileIDS={unsavedFileIDS}
            onCloseTab={handleCloseTab}
            onTabClick={handleTabClick}
            onChange={handleEditorChange}
          />
        </div>
      </div>
    </div>
  );
}
