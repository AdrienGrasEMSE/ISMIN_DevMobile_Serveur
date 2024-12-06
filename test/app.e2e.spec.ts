import type { INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import type supertest from 'supertest';
import {UserModule} from "../src/user.module";

describe('Users API', () => {
  let app: INestApplication;
  let httpRequester: supertest.Agent;


  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    httpRequester = request(app.getHttpServer());
  });




  /**
   * Test : Get all users
   */
  it('GET /users', async () => {
    const response = await httpRequester.get('/users').expect(200);

    expect(response.body).toEqual(expect.any(Array));
  });




  /**
   * Test : Create a user
   */
  it('POST /users', async () => {
    const response = await httpRequester
      .post('/users')
      .send({
        gender:         'male',
        name:           {
                          title:          'Lord',
                          first:          'Pablo',
                          last:           'Escoubar',
        },
        location:       {
                          street:         {
                                          number:         '879',
                                          name:           'Route de Mimet',
                          },
                          city:           'Gardanne',
                          state:          'Bouches-du-Rhône',
                          country:        'FRANCE',
                          postcode:       '13120',
                          coordinates:    {
                                          latitude:       '43.450001',
                                          longitude:      '5.46667',
                          },
                          timezone:       {
                                          offset:         '+1:00',
                                          description:    'Central European Time',
                          },
        },
        email:          'oskur@mail.com',
        login:          {
                          uuid:           'de351d17-937a-4b3e-8ab8-7fbe0db5ce7e',
                          username:       'PabloCoubar',
        },
        dob:            {
                          date:           '2001-01-01T01:43:58.309Z',
                          age:            '23',
        },
        registered:     {
                          date:           '2021-01-01T01:43:58.309Z',
                          age:            '23',
        },
        phone:          '0412345678',
        cell:           '0612345678',
        id:             {
                          name:           'INSEE',
                          value:          '1970874716690 91',
        },
        picture:        {
                          large:          'https://randomuser.me/api/portraits/men/3.jpg',
                          medium:         'https://randomuser.me/api/portraits/med/men/3.jpg',
                          thumbnail:      'https://randomuser.me/api/portraits/thumb/men/3.jpg',
        },
        nat:            'FR',
      })
      .expect(201);

    expect(response.body).toEqual({
      gender:         'male',
      name:           {
        title:          'Lord',
        first:          'Pablo',
        last:           'Escoubar',
      },
      location:       {
        street:         {
          number:         '879',
          name:           'Route de Mimet',
        },
        city:           'Gardanne',
        state:          'Bouches-du-Rhône',
        country:        'FRANCE',
        postcode:       '13120',
        coordinates:    {
          latitude:       '43.450001',
          longitude:      '5.46667',
        },
        timezone:       {
          offset:         '+1:00',
          description:    'Central European Time',
        },
      },
      email:          'oskur@mail.com',
      login:          {
        uuid:           'de351d17-937a-4b3e-8ab8-7fbe0db5ce7e',
        username:       'PabloCoubar',
      },
      dob:            {
        date:           '2001-01-01T01:43:58.309Z',
        age:            '23',
      },
      registered:     {
        date:           '2021-01-01T01:43:58.309Z',
        age:            '23',
      },
      phone:          '0412345678',
      cell:           '0612345678',
      id:             {
        name:           'INSEE',
        value:          '1970874716690 91',
      },
      picture:        {
        large:          'https://randomuser.me/api/portraits/men/3.jpg',
        medium:         'https://randomuser.me/api/portraits/med/men/3.jpg',
        thumbnail:      'https://randomuser.me/api/portraits/thumb/men/3.jpg',
      },
      nat:            'FR',
    });
  });




  /**
   * Test : Get a specific user using its uuid
   */
  it('GET /users/:uuid', async () => {

    // First prepare the data by adding a user
    await httpRequester.post('/users').send({
      gender:         'male',
      name:           {
        title:          'Lord',
        first:          'Pablo',
        last:           'Escoubar',
      },
      location:       {
        street:         {
          number:         '879',
          name:           'Route de Mimet',
        },
        city:           'Gardanne',
        state:          'Bouches-du-Rhône',
        country:        'FRANCE',
        postcode:       '13120',
        coordinates:    {
          latitude:       '43.450001',
          longitude:      '5.46667',
        },
        timezone:       {
          offset:         '+1:00',
          description:    'Central European Time',
        },
      },
      email:          'oskur@mail.com',
      login:          {
        uuid:           'de351d17-937a-4b3e-8ab8-7fbe0db5ce7e',
        username:       'PabloCoubar',
      },
      dob:            {
        date:           '2001-01-01T01:43:58.309Z',
        age:            '23',
      },
      registered:     {
        date:           '2021-01-01T01:43:58.309Z',
        age:            '23',
      },
      phone:          '0412345678',
      cell:           '0612345678',
      id:             {
        name:           'INSEE',
        value:          '1970874716690 91',
      },
      picture:        {
        large:          'https://randomuser.me/api/portraits/men/3.jpg',
        medium:         'https://randomuser.me/api/portraits/med/men/3.jpg',
        thumbnail:      'https://randomuser.me/api/portraits/thumb/men/3.jpg',
      },
      nat:            'FR',
    });

    // Then get the previously stored book
    const response = await httpRequester
      .get('/users/de351d17-937a-4b3e-8ab8-7fbe0db5ce7e')
      .expect(200);

    expect(response.body).toEqual({
      gender:         'male',
      name:           {
        title:          'Lord',
        first:          'Pablo',
        last:           'Escoubar',
      },
      location:       {
        street:         {
          number:         '879',
          name:           'Route de Mimet',
        },
        city:           'Gardanne',
        state:          'Bouches-du-Rhône',
        country:        'FRANCE',
        postcode:       '13120',
        coordinates:    {
          latitude:       '43.450001',
          longitude:      '5.46667',
        },
        timezone:       {
          offset:         '+1:00',
          description:    'Central European Time',
        },
      },
      email:          'oskur@mail.com',
      login:          {
        uuid:           'de351d17-937a-4b3e-8ab8-7fbe0db5ce7e',
        username:       'PabloCoubar',
      },
      dob:            {
        date:           '2001-01-01T01:43:58.309Z',
        age:            '23',
      },
      registered:     {
        date:           '2021-01-01T01:43:58.309Z',
        age:            '23',
      },
      phone:          '0412345678',
      cell:           '0612345678',
      id:             {
        name:           'INSEE',
        value:          '1970874716690 91',
      },
      picture:        {
        large:          'https://randomuser.me/api/portraits/men/3.jpg',
        medium:         'https://randomuser.me/api/portraits/med/men/3.jpg',
        thumbnail:      'https://randomuser.me/api/portraits/thumb/men/3.jpg',
      },
      nat:            'FR',
    });
  });




  /**
   * Test : Delete all users
   */
  it('DELETE /users/', async () => {

    // Delete all users
    await httpRequester.delete('/users/').expect(200);

    // Finally, check users was successfully deleted
    const response = await httpRequester.get('/users');

    expect(response.body).toEqual([]);
  });




  /**
   * Test : Delete a specific user
   */
  it('DELETE /users/:uuid', async () => {

    // Delete all users
    await httpRequester.delete('/users/').expect(200);


    // First prepare the data by adding a user
    await httpRequester.post('/users').send({
      gender:         'male',
      name:           {
        title:          'Lord',
        first:          'Pablo',
        last:           'Escoubar',
      },
      location:       {
        street:         {
          number:         '879',
          name:           'Route de Mimet',
        },
        city:           'Gardanne',
        state:          'Bouches-du-Rhône',
        country:        'FRANCE',
        postcode:       '13120',
        coordinates:    {
          latitude:       '43.450001',
          longitude:      '5.46667',
        },
        timezone:       {
          offset:         '+1:00',
          description:    'Central European Time',
        },
      },
      email:          'oskur@mail.com',
      login:          {
        uuid:           'de351d17-937a-4b3e-8ab8-7fbe0db5ce7e',
        username:       'PabloCoubar',
      },
      dob:            {
        date:           '2001-01-01T01:43:58.309Z',
        age:            '23',
      },
      registered:     {
        date:           '2021-01-01T01:43:58.309Z',
        age:            '23',
      },
      phone:          '0412345678',
      cell:           '0612345678',
      id:             {
        name:           'INSEE',
        value:          '1970874716690 91',
      },
      picture:        {
        large:          'https://randomuser.me/api/portraits/men/3.jpg',
        medium:         'https://randomuser.me/api/portraits/med/men/3.jpg',
        thumbnail:      'https://randomuser.me/api/portraits/thumb/men/3.jpg',
      },
      nat:            'FR',
    });


    // Delete the user
    await httpRequester.delete('/users/de351d17-937a-4b3e-8ab8-7fbe0db5ce7e').expect(200);


    // Finally, check the user was successfully deleted
    const response = await httpRequester.get('/users');


    expect(response.body).toEqual([]);
  });
});
