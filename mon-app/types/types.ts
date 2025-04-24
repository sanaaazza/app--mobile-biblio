export type Book = {
  id: string;
  title: string;
  author: string;
  year: number;
};
export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  BookList: undefined;
  BorrowList: undefined;
  Menu: undefined;
  AddBook: undefined;
  Profile: undefined;
  HomeAdmin: undefined;
  HomeUser: undefined;
  EditBook: { bookId: string }; // Paramètre bookId attendu pour la route EditBook
};
// types.ts

export type Borrowing = {
  id: number;
  borrowDate: string;
  returnDate: string;
  user: {
    id: number;
    name: string;
  };
  book: {
    id: number;
    title: string;
  };
};
