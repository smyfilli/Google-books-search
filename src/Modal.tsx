import React from "react";

const Modal = ({
  active,
  setActive,

  children
}: {
  active: boolean;
  setActive: any;

  children: any;
}) => {
  return (
    <div
      className={active ? "modal active" : "modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <p>{book.title}</p> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
