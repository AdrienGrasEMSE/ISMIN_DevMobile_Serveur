interface Name {
    title:          string;
    first:          string;
    last:           string;
}



interface Street {
    number:         string;
    name:           string;
}



interface Coordinates {
    latitude:       string;
    longitude:      string;
}



interface Timezone {
    offset:         string;
    description:    string;
}



interface Login {
    uuid:           string;
    username:       string;
}



interface Dob {
    date:           string;
    age:            string;
}



interface Registered {
    date:           string;
    age:            string;
}



interface Id {
    name:           string;
    value:          string;
}



interface Picture {
    large:          string;
    medium:         string;
    thumbnail:      string;
}




interface Location {
    street:         Street;
    city:           string;
    state:          string;
    country:        string;
    postcode:       string;
    coordinates:    Coordinates;
    timezone:       Timezone;
}




/**
 * User Interface
 *
 * @author Adrien GRAS
 */
export interface User {
    isFavorite:    boolean;
    gender:         string;
    name:           Name;
    location:       Location;
    email:          string;
    login:          Login;
    dob:            Dob;
    registered:     Registered;
    phone:          string;
    cell:           string;
    id:             Id;
    picture:        Picture;
    nat:            string;
}
