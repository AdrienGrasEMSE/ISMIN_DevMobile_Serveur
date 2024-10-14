import { ISBN } from './ISBN';



/**
 * Book Interface
 *
 * @author Gaëtan MAISSE
 */
export interface Book {
    isbn:   ISBN;
    title:  string;
    author: string;
    date:   string;
}
