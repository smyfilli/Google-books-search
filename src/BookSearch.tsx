import { useState } from "react";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./styles.css";
import BookStore from "./store/BookStore";
import Book from "./Book";

const bookStore = new BookStore();

const BookList = observer(() => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    bookStore.fetchBooks(category);
  }, [category]);

  const handleSearch = () => {
    bookStore.setSearchTerm(searchTerm);
    bookStore.fetchBooks(category);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <div className="header">
        <div>
          <h1>Search for a books</h1>
        </div>
        <div>
          <input
            className="search-input"
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div>
          <label className="category-label" htmlFor="category">
            Category:{" "}
          </label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="art">Art</option>
            <option value="biography">Biography</option>
            <option value="computers">Computers</option>
            <option value="history">History</option>
            <option value="medical">Medical</option>
            <option value="poetry">Poetry</option>
          </select>
        </div>
      </div>
      <div>Found {bookStore.totalItems} results</div>
      <div className="book">
        {bookStore.books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
});

export default BookList;
