import { useState } from "react";
import child from "./components/Child.js";
import Children from "./components/Children.js";
import "./App.css";

const comments = {
  id: 1,
  children: [],
};
function App() {
  const [commentsData, setCommentsData] = useState(comments);
  const[flag, setFlag] = useState(false)
  const { insertChild, editChild } = child();
  const [exportedData, setExportedData] = useState(null); 
 

  const handleInsertChild = (folderId, item) => {
    const resultData = insertChild(commentsData, folderId, item);
    setCommentsData(resultData);
  };

  const handleEditChild = (folderId, value) => {
    const resultData = editChild(commentsData, folderId, value);
    setCommentsData(resultData);
  };

   const clickingExporting = () => {
   setFlag(true)
  const commentsDataJSON = JSON.stringify(commentsData); 
  setExportedData(commentsDataJSON);
   }

   return (
    <div className="App">
    <Children
          handleInsertChild={handleInsertChild}
          handleEditChild={handleEditChild}
          comment={commentsData}
        />
    <button className="export-button" onClick={clickingExporting}>Export</button>
        {flag && (
            <>
            {exportedData && <div>{exportedData}</div>} 
           </>
        )}
    </div>
    )
};

export default App;