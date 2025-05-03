import React, { useState } from "react";
import "../css/Watch.css";

const Comment = ({ item, handelDelete, addNewNestedComm }) => {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState("");

  function handelAddComm() {
    if(!reply.trim())return;

    addNewNestedComm(reply, item.id);
    setReply("");
    setShowReply(false);
  }

  return (
    <div className="mass">
      <div className="main_mass_container">
        <div className="main_mass">
          <p>{item && item.com}</p>
          <button onClick={() => handelDelete(item.id, item)}>delete</button>
          <button onClick={(e) => setShowReply(!showReply)}>{showReply ? "Cancel":"Reply"}</button>
        </div>

        {showReply && (
          <div className="input_container">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button onClick={handelAddComm}>Save</button>
          </div>
        )}
      </div>
      <div className="inner">
        {item?.children &&
          item.children.map((item) => (
            <Comment
              key={item.id}
              item={item}
              addNewNestedComm={addNewNestedComm}
              handelDelete={handelDelete}
            />
          ))}
      </div>
    </div>
  );
};

export default Comment;
