import React, { useState } from "react";
import { Book as BookType } from "./data/types";
import Modal from "./Modal";

interface Props {
  book: BookType;
}

const Book = ({ book }: Props) => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <>
      <div id="main" onClick={() => setModalActive(true)}>
        <div>
          <img src={book.image} alt={book.title} />
        </div>
        <div>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.category}</p>
        </div>
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <div>
          <img className="modal-img" src={book.image} alt={book.title} />
        </div>
        <div className="book-info">
          <p>{book.category}</p>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <p>{book.description}</p>
        </div>
      </Modal>
    </>
  );
};

export default Book;
