import { observable, action, makeObservable, runInAction } from "mobx";
import { Book } from "../data/types";

class BookStore {
  @observable books: Book[] = [];
  @observable searchTerm: string = "";
  @observable totalItems: number = 0;

  constructor() {
    makeObservable(this);
  }

  @action setSearchTerm = (searchTerm: string) => {
    this.searchTerm = searchTerm;
  };

  @action async fetchBooks(category: string = "all") {
    let url = `https://www.googleapis.com/books/v1/volumes?q=`;

    if (category !== "all") {
      url += `subject:${category}+`;
    }

    if (this.searchTerm) {
      url += `intitle:${this.searchTerm}+`;
    }

    try {
      const key = `&key=AIzaSyBvIo0TwJya1yxDBWLH5P8kZXExQzQF_Ho`;
      const response = await fetch(url + key);
      const json = await response.json();

      const totalItems = json.totalItems;

      const books = json.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.[0] || "Unknown",
        image: item.volumeInfo.imageLinks?.thumbnail,
        description: item.volumeInfo.description,
        category: item.volumeInfo.categories?.[0] || "Unknown"
      }));

      runInAction(() => {
        this.books = books;
        this.totalItems = totalItems;
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  }
}

export default BookStore;
