interface NameAPI {
    title:          string;
    first:          string;
    last:           string;
}



interface StreetAPI {
    number:         string;
    name:           string;
}



interface CoordinatesAPI {
    latitude:       string;
    longitude:      string;
}



interface TimezoneAPI {
    offset:         string;
    description:    string;
}



interface LoginAPI {
    uuid:           string;
    username:       string;
}



interface DobAPI {
    date:           string;
    age:            string;
}



interface RegisteredAPI {
    date:           string;
    age:            string;
}



interface IdAPI {
    name:           string;
    value:          string;
}



interface PictureAPI {
    large:          string;
    medium:         string;
    thumbnail:      string;
}



interface LocationAPI {
    street:         StreetAPI;
    city:           string;
    state:          string;
    country:        string;
    postcode:       string;
    coordinates:    CoordinatesAPI;
    timezone:       TimezoneAPI;
}



/**
 * User API Interface
 *
 * @author Adrien GRAS
 */
export interface UserAPI {
    gender:         string;
    name:           NameAPI;
    location:       LocationAPI;
    email:          string;
    login:          LoginAPI;
    dob:            DobAPI;
    registered:     RegisteredAPI;
    phone:          string;
    cell:           string;
    id:             IdAPI;
    picture:        PictureAPI;
    nat:            string;
}
