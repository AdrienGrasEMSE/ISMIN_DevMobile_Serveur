# ISMIN DevMobile Serveur

This project is basically a school project (from the École des Mines de Saint Étienne), in which we had to develop a mobile application with a REST-type architecture. This TypeScript project is the web server.

> The mobile part is in this repo :
> 



# Objective

The main objective here is to manage a large number of different users. On the mobile side, we can display user lists, user location, create or delete a user, display user details and bookmark a user.

The aim of the server is therefore to manage these functions for the mobile part.



# Getting started

To use this web server, you need to install Node.js on your machine. You can then use the following steps to launch the server:

```
# Go into the server directory
cd server_dir

# Install dependencies
npm run install

# Launch the server
npm run start:prod
```



# Features

## Storage of users

This web server retrieves (at start-up) a list of 5,000 users from the following API: https://randomuser.me/api/?results=5000. 

Users are accompanied by a large amount of data, such as name, telephone number, e-mail address, etc. The location of the user is very useful for the mobile part, because the mobile part plots them on a map. The user's uuid is also very useful, as it allows us to identify users using a unique identifier.

Here is the data model for an entire user:
|Data name                          |Type of data     |Data usage       |
|-----------------------------------|-----------------|-----------------|
|`isFavorite`                       |`boolean`        |Indicate whether the user is a favorite
|`gender`                           |`string`         |
|`name`                             |`object`         |
|`name.title`                       |`string`         |User title (Lord, Dr...)
|`name.first`                       |`string`         |
|`name.last`                        |`string`         |
|`location`                         |`object`         |
|`location.street`                  |`object`         |
|`location.street.number`           |`string`         |
|`location.street.name`             |`string`         |
|`location.city`                    |`string`         |
|`location.state`                   |`string`         |
|`location.country`                 |`string`         |
|`location.postcode`                |`string`         |
|`location.coordinates`             |`object`         |
|`location.coordinates.latitude`    |`string`         |
|`location.coordinates.longitude`   |`string`         |
|`location.timezone`                |`object`         |
|`location.timezone.offset`         |`string`         |
|`location.timezone.description`    |`string`         |
|`email`                            |`string`         |
|`login`                            |`object`         |
|`login.uuid`                       |`string`         |
|`login.username`                   |`string`         |
|`dob`                              |`object`         |Date of birth
|`dob.date`                         |`string`         |
|`dob.age`                          |`string`         |
|`registered`                       |`object`         |Date of legal registration
|`registered.date`                  |`string`         |
|`registered.age`                   |`string`         |
|`phone`                            |`string`         |Phone
|`cell`                             |`string`         |Cellphone
|`id`                               |`string`         |Legal identification
|`id.name`                          |`string`         |
|`id.value`                         |`string`         |
|`picture`                          |`object`         |Pictures for the mobile part
|`picture.large`                    |`string`         |
|`picture.medium`                   |`string`         |
|`picture.thumbnail`                |`string`         |
|`nat`                              |`string`         |Nationality



## Handling users

Users are then stored in a map, where the value is a User object and the key is its uuid. We can perform various actions with this storage:


### Recover all users

Recover all the users in the database. This action is a little slow, as it returns all 5,000 users from the local database. That's why we've created a second way of retrieving users.


###  Get a user page

This is used to obtain 20 users per 20. It is fatser than the previous one as it only returns 20 users. The pagination system is only virtual. It only uses the map (converted to arry), and calculates the start and end index as if it were a real page.


### Get a specific user

This function is used to obtain a specific user, with its uuid.


### Retrieve all favorite users


### Add a user


### Add or remove a user from favorites


### Remove a specific user

This allows us to delete a specific user, with its uuid.


### Delete all users

This function deletes all users from local storage.


### Search for users

This function allows you to search for users by their first or last name.



## Mobile interface

As this is a web server designed for mobile use, it must implement request points :


### GET server_address/users

Get all users


### GET server_address/users/page/{page_num}

Get all users on the {page_num} page
> Send a `404 not found` if the page does not exist


### GET server_adress/Users/Favorite

Get all users in favorites


### GET server_address/users/{uuid}

Get the user with the uuid: {uuid}
> Send a `404 not found` if the user does not exist


### POST server_adress/Users

Create a user, with a JSON body like :
```
{
  "isFavorite" : false,
  "gender": "male",
  "name": {
    "title": "Lord",
    "first": "Pablo",
    "last": "Escoubar"
  },
  "location": {
    "street": {
      "number": "879",
      "name": "Route de Mimet"
    },
    "city": "Gardanne",
    "state": "Bouches-du-Rhône",
    "country": "FRANCE",
    "postcode": "13120",
    "coordinates": {
      "latitude": "43.450001",
      "longitude": "5.46667"
    },
    "timezone": {
      "offset": "+1:00",
      "description": "Central European Time"
    }
  },
  "email": "oskur@mail.com",
  "login": {
    "uuid": "de351d17-937a-4b3e-8ab8-7fbe0db5ce7e",
    "username": "PabloCoubar"
  },
  "dob": {
    "date": "2001-01-01T01:43:58.309Z",
    "age": "23"
  },
  "registered": {
    "date": "2021-01-01T01:43:58.309Z",
    "age": "23"
  },
  "phone": "0412345678",
  "cell": "0612345678",
  "id": {
    "name": "INSEE",
    "value": "1970874716690 91"
  },
  "picture": {
    "large": "https://randomuser.me/api/portraits/men/3.jpg",
    "medium": "https://randomuser.me/api/portraits/med/men/3.jpg",
    "thumbnail": "https://randomuser.me/api/portraits/thumb/men/3.jpg"
  },
  "nat": "FR"
}
```
> Return the user created to confirm the transaction


### PATCH server_address/Users/{uuid}

Add or remove the user with uuid: {uuid} from the bookmark.
> Send a `404 not found` if the user does not exist.

This request uses a JSON body:
```
{
  "isFavorite" : true
}
```
> Return the updated user to confirm the transaction


### DELETE server_adress/Users/{uuid}

Deletes the user whose uuid is: {uuid}.


### DELETE server_adress/Users

Deletes all users stored on the server.

### 
> Adrien GRAS, École d'ingénieurs de Mines Saint Étienne
>
> I'm not the best in English, so don't judge me too harshly :)

