import { ISBN } from './ISBN';



/**
 * Book from API Interface
 *
 * @author Adrien GRAS
 */
export interface BookAPI {
    isbn:               ISBN;
    title:              string;
    authors:            string;
    num_pages:          number;
    publisher:          string;
    language_code:      string
    publication_date:   string;

}
