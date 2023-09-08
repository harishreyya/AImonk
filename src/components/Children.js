import { useState, useRef, useEffect } from "react";
import Show from "./Show";

const Children = ({
  handleInsertChild,
  handleEditChild,
  comment,
}) => {
  const [input, setInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [arrow, setArrow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef?.current?.focus();
  }, [edit]);

  const handleNewComment = () => {
    setArrow(!arrow);
    setShowInput(true);
  };

  const onAddComment = () => {
    if (edit) {
      handleEditChild(comment.id, inputRef?.current?.innerText);
    } else {
      setArrow(true);
      handleInsertChild(comment.id, input);
      setShowInput(false);
      setInput("");
    }

    if (edit) setEdit(false);
  
  };

  const fillInput = () =>{
   alert("fill the input box")
  }

  return (
    <div>
      
      <div className={comment.id === 1 ? "inputContainer" : "commentContainer"}>
        {comment.id === 1 ? (
          <div className="root-comment">
            <input
              type="text"
              className="inputContainer__input first_input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Data"
            />

            {input?(
              <Show
              className="reply"
              type="Add Child"
              handleClick={onAddComment}
            />
            ):(
              <Show
              className="reply"
              type="Add Child"
              handleClick={fillInput}
            />
            )}

            {/* ------------ */}
          </div>
        ) : (
          < div className="child-comment-parent">
            <div className="child-comment">
               <p>child</p>
              {edit ? (
                <>
                <div className="reply-button-wrap">
                  <div  className="icons" onClick={onAddComment}>&#10003;</div>
                  <div className="icons" onClick={() => {
                      if (inputRef.current)
                        inputRef.current.innerText = comment.commentName;
                      setEdit(false);
                    }}>&#128473;</div>
                  </div>
                </>
              ) : (
                <div className="reply-button-wrap">
                 
                  <Show
                    className="reply"
                    type={
                      <>
                      {arrow ? (
                          
                          <div>&#8595;</div>
                          
                        ) : (
                          
                          <div>&#8594;</div>
                        )}{" "}
                       
                        Add Child
                      </>
                    }
                    handleClick={handleNewComment}
                  />
                  <div className="icons" onClick={() => {
                      setEdit(true);
                    }}>
                    &#9998;
                  </div>
                  
                </ div>
                   )}
         </div>
         
            <div className="input-box"
              contentEditable={edit}
              suppressContentEditableWarning={edit}
              ref={inputRef}
            >
              {comment.commentName}
            </div>
            
           
          </div>
        )}
      </div>

      <div style={{ display: arrow ? "block" : "none", paddingLeft: 25 }}>
        {showInput && (
          <div className="inputContainer inline-reply">
            <input
              type="text"
              className="inputContainer__input"
              autoFocus
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="reply-cancel-wrap">
            <div className="icons" onClick={onAddComment}>&#10003;</div>
            <div className="icons" onClick={() => {
                setShowInput(false);
                if (!comment?.children?.length) setArrow(false);
              }}>&#128473;</div>
            </div>
          </div>
        )}

        {comment?.children?.map((comment) => {
          return (
            <Children
              key={comment.id}
              handleInsertChild={handleInsertChild}
              handleEditChild={handleEditChild}
              comment={comment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Children;
