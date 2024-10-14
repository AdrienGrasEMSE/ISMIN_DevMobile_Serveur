import type {Book}                      from './Book';
import      {BookAPI}                   from "./BookAPI";
import      {Injectable, OnModuleInit}  from '@nestjs/common';
import      *                           as fs from "node:fs";
import      {HttpService}               from "@nestjs/axios";
import {firstValueFrom, map, Observable} from 'rxjs';
import {Axios} from "axios";
import {BookDto} from "./Book.dto";



/**
 * BookService : class which handle a storage of books
 *
 * @author Gaëtan MAISSE (modified by Adrien GRAS)
 */
@Injectable()
export class BookService implements OnModuleInit {

    /** Http service */
    constructor(private readonly httpService: HttpService) {}


    /** Book storage */
    private storage: Map<string, Book> = new Map();


    /**
     * Method which run on server start
     *
     * @author  Adrien GRAS
     */
    async onModuleInit() {

        // Execute all asynchronous book import
        await Promise.all([await this.loadBooksFromFile(),await this.loadBooksFromAPI()]);

    }




    /**
     * Method which load books from the api
     *
     * @author  Adrien GRAS
     */
    private async loadBooksFromAPI() {

        // Getting all books
        const {data} = await firstValueFrom(
            this.httpService.get<BookAPI[]>('https://api.npoint.io/fbb2a6039fc21e320b30').pipe()
        )


        // Conversion
        const bookAPIs : BookAPI[] = data;
        console.log(bookAPIs[0]);
        const books : Book[] = bookAPIs.map((bookAPI: BookAPI) => ({
            isbn:   bookAPI.isbn,
            title:  bookAPI.title,
            author: bookAPI.authors,
            date:   bookAPI.publication_date,
        }));


        // Adding all books
        for (const book of books) {
            this.addBook(book);
        }

    }
    



    /**
     * Method which load dataset's books
     *
     * @author  Adrien GRAS
     */
    private async loadBooksFromFile() {

        // Trying reading data
        try {
            // Reading data
            const data          = await fs.promises.readFile('./src/dataset.json', 'utf8');
            const booksList: Book[]     = JSON.parse(data);


            // Adding all books
            for (const book of booksList) {
                this.addBook(book);
            }


        // Handling errors
        } catch (err) {
            console.error(err);
        }
    }




    /**
     * Add a book to the storage
     *
     * @author  Gaëtan MAISSE
     * @param   book
     */
    addBook(book: Book) {
        this.storage.set(book.isbn, book);
    }




    /**
     * Getting a book using its isbn
     *
     * @author  Gaëtan MAISSE
     * @param   isbn
     */
    getBook(isbn: string): Book {

        // Getting the book
        const book = this.storage.get(isbn);


        // If the book exist (this if condition check if it is defined)
        if (!book) {
            throw new Error(`Book with ISBN ${isbn} not found`);
        }


        // Returning the book
        return book;
    }




    /**
     * Getting all books
     *
     * @author  Gaëtan MAISSE
     */
    getAllBooks(): Book[] {

        // Sorting the storage
        return Array.from(this.storage.values()).sort((a, b) =>
            a.title.localeCompare(b.title),
        );

    }




    /**
     * Getting a book using its author
     *
     * @author  Gaëtan MAISSE
     * @param   author
     */
    getBooksOf(author: string): Book[] {

        // Filtering the storage
        return this.getAllBooks()
            .filter ((book) => book.author === author)
            .sort   ((a, b) => a.title.localeCompare(b.title));
    }




    /**
     * Getting the number of book stored
     *
     * @author  Gaëtan MAISSE
     */
    getTotalNumberOfBooks(): number {
        return this.storage.size;
    }




    /**
     * Remove a book using its isbn
     *
     * @author  Gaëtan MAISSE
     * @param   isbn
     */
    remove(isbn: string) {
        this.storage.delete(isbn);
    }




    /**
     * Remove all books stored
     *
     * @author  Gaëtan MAISSE
     */
    removeAll() {
        this.storage.clear();
    }




    /**
     * Search a book using a string term
     *
     * @author  Gaëtan MAISSE
     * @param   term
     *
     * Term : it can contain the title and the author of the book.
     */
    search(term: string) {
        return Array.from(this.storage.values())
            .filter((book) => book.title.includes(term) || book.author.includes(term))
            .sort((a, b) => a.title.localeCompare(b.title));
    }

}
