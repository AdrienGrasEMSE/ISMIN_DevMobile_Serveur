import type {User}                  from './user';
import {UserAPI}                    from "./userAPI";
import {Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import {HttpService}                from "@nestjs/axios";
import {firstValueFrom}             from 'rxjs';




/**
 * UserService : class which handle a storage of users
 *
 * @author Adrien GRAS
 */
@Injectable()
export class UserService implements OnModuleInit {

    /** Http service */
    constructor(private readonly httpService: HttpService) {}


    /** User storage */
    private storage: Map<string, User> = new Map();




    /**
     * Method which run on server start
     *
     * @author  Adrien GRAS
     */
    async onModuleInit() {

        // Execute all asynchronous user import (fetching users from the API)
        await Promise.all([await this.loadUsersFromAPI()]);

    }




    /**
     * Method which load users from the API
     *
     * @author  Adrien GRAS
     */
    private async loadUsersFromAPI() {

        // Getting all users
        const {data} = await firstValueFrom(
            this.httpService.get<{ results: UserAPI[] }>('https://randomuser.me/api/?results=5000').pipe()
        )


        // Conversion
        const users : User[] = data.results.map((userAPI: UserAPI) => ({
            isFavorite:false,
            gender:     userAPI.gender,
            name:       userAPI.name,
            location:   userAPI.location,
            email:      userAPI.email,
            login:      userAPI.login,
            dob:        userAPI.dob,
            registered: userAPI.registered,
            phone:      userAPI.phone,
            cell:       userAPI.cell,
            id:         userAPI.id,
            picture:    userAPI.picture,
            nat:        userAPI.nat,
        }));


        // Adding all users
        for (const user of users) {
            this.addUser(user);
        }

    }




    /**
     * Add a user to the storage
     *
     * @author  Adrien GRAS
     * @param   user
     */
    addUser(user: User) {
        this.storage.set(user.login.uuid, user);
    }




    /**
     * Getting a user using its uuid
     *
     * @author  Adrien GRAS
     * @param   uuid
     */
    getUser(uuid: string): User {

        // Getting the user
        const user = this.storage.get(uuid);


        // If the user exist (this if condition check if it is defined)
        if (!user) {
            throw new Error(`User with UUID '${uuid}' not found`);
        }


        // Returning the user
        return user;
    }




    /**
     * Getting all users (ordered by the last name)
     *
     * @author  Adrien GRAS
     */
    getAllUsers(): User[] {

        // Sorting the storage
        return Array.from(this.storage.values()).sort((a, b) =>
            a.name.last.localeCompare(b.name.last),
        );

    }




    /**
     * Getting 20 users (ordered by the last name), using
     * a pagination system
     *
     * @author  Adrien GRAS
     */
    getAllUsersPage(num_page: number): User[] {

        // Number of user per page
        const usersPerPage = 20;


        // Index calculation
        const startIndex    = (num_page - 1) * usersPerPage;
        const endIndex      = startIndex + usersPerPage;


        // Bad index management
        if (num_page < 1 || startIndex > this.storage.size) {
            throw new Error(`Page ${num_page} does not exist`);
        }


        // Sorting the storage
        const sortedUsers = Array.from(this.storage.values()).sort((a, b) =>
            a.name.last.localeCompare(b.name.last),
        );


        // Return users
        return sortedUsers.slice(startIndex, endIndex);

    }




    /**
     * Getting all Favorite
     *
     * @author  Adrien GRAS
     */
    getUsersFavorite(): User[] {

        // Sorting the storage, getting only favorite Users
        return Array.from(this.storage.values())
            .filter(user => user.isFavorite === true)
            .sort((a, b) => a.name.last.localeCompare(b.name.last),
        );

    }




    /**
     * Update isFavorite for a specific User
     *
     * @author Adrien GRAS
     * @param uuid
     */
    patchUser(uuid: string, isFavorite: boolean) : User {

        // Getting the user
        const user = this.storage.get(uuid);


        // If the user exist (this if condition check if it is defined)
        if (!user) {
            throw new Error(`User with UUID '${uuid}' not found`);
        }


        // Updating the user
        user.isFavorite = isFavorite;


        // Returning the user (to confirm transaction)
        return user;

    }




    /**
     * Getting the number of users stored
     *
     * @author  Adrien GRAS
     * @unusued
     */
    getNumberOfUsers(): number {
        return this.storage.size;
    }




    /**
     * Remove a user using its uuid
     *
     * @author  Adrien GRAS
     * @param   uuid
     */
    remove(uuid: string) {
        this.storage.delete(uuid);
    }




    /**
     * Remove all users stored
     *
     * @author  Adrien GRAS
     */
    removeAll() {
        this.storage.clear();
    }




    /**
     * Search a user using a string term
     *
     * @author  Adrien GRAS
     * @param   term
     *
     * Term : it can contain the first and last name of the user.
     */
    search(term: string) {
        return Array.from(this.storage.values())
            .filter((user) => user.name.first.includes(term) || user.name.last.includes(term))
            .sort((a, b) => a.name.last.localeCompare(b.name.last));
    }

}
