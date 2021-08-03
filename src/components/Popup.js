import React from "react";

const Popup = (props) => {
  return (
    <div className={`modal${props.className ? props.className : ""}`}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {props.title ? (
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button type="button" className="close" onClick={props.close}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          ) : (
            ""
          )}

          <div className="modal-body">{props.body}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={props.close}
            >
              {props.closeText ? props.closeText : "Close"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
