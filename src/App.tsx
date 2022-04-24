import React from "react";

import { v4 as uuidv4 } from "uuid";

import { flattenArr, objToArr } from "./utils/helper";

import defaultFiles, { IFileItem } from "./utils/defaultFiles";

import LeftPanel from "./views/LeftPanel";
import RightPanel from "./views/RightPanel";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.scss";

export default function App() {
  const [keyword, setKeyword] = React.useState("");
  const [files, setFiles] = React.useState(flattenArr(defaultFiles));
  const [activeFileID, setActionFileID] = React.useState("");
  const [openedFileIDS, setOpenedFileIDS] = React.useState<string[]>([]);
  const [unsavedFileIDS, setUnsavedFileIDS] = React.useState<string[]>([]);

  const openedFiles = openedFileIDS.map((id) => {
    return files[id];
  });

  const handleSearchChange = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleFileDelete = (id: string) => {
    delete files[id];

    setFiles({ ...files });
    handleCloseTab(id);
  };

  const handleSaveEdit = (id: string, title: string, isNew: boolean) => {
    const file = files[id];

    file.title = title;
    file.isNew = false;

    setFiles({ ...files });
  };

  const handleFileClick = (id: string) => {
    setActionFileID(id);
    setOpenedFileIDS([...new Set([id, ...openedFileIDS])]);
  };

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
    const newFile = {
      ...files[id],
      [key]: value,
    };

    setFiles({ ...files, [id]: newFile });
  };

  const handleUpdateFileName = (id: string, value: string) => {
    handleFileChange(id, value, "title");
  };

  const createNewFile = () => {
    const id = uuidv4();

    setFiles({
      [id]: {
        id,
        title: "",
        body: "",
        isNew: true,
        createdAt: Date.now(),
      },
      ...files,
    });
  };

  const filesData = React.useMemo(() => {
    return keyword.length
      ? objToArr(files).filter((f) => f.title.includes(keyword))
      : objToArr(files);
  }, [keyword, files]);

  const activeFile = files[activeFileID];

  React.useEffect(() => {
    window.electron.remote.ipcRenderer.send('www')

  }, []);

  return (
    <div className="App container-fluid px-0">
      <div className="row no-gutters">
        <div className="col-3 px-0">
          <LeftPanel
            files={filesData}
            onSaveEdit={handleSaveEdit}
            onFileDelete={handleFileDelete}
            onFileClick={handleFileClick}
            onChange={handleSearchChange}
            onImport={handleImport}
            handleUpdateFileName={handleUpdateFileName}
            createNewFile={createNewFile}
          />
        </div>

        <div className="col-9 px-0">
          <RightPanel
            activeFile={activeFile}
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
