# BYOB: Building my own backend

## Summary

I built this project with the intention of getting more comfortable with building databases using Express, Knex, and PostgreSQL. I wanted to build a RESTful API, complete with professional-grade documentation.

### Learning Highlights

- Built my own RESTful API for a large dataset of films and directors.
- One-to-many relational database schema design.
- Deploying API to Heroku.

## Developer

- [edwindelbosque](https://github.com/edwindelbosque)

## API - Endpoints

### User Account

| Purpose                                  | URL                          | Verb   | Request Body                                     | Sample Success Response                                                                                                                                |
| ---------------------------------------- | ---------------------------- | ------ | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Get all directors                        | `/api/v1/directors`          | GET    | none                                             | `{id: 2, first_name: "Alex", last_name: "Soong", film_id: 23}`                                                                                         |
| Get specific director                    | `/api/v1/directors/:id`      | GET    | none                                             | `{id: 2, first_name: "Alex", last_name: "Soong", film_id: 23}`                                                                                         |
| Get all films                            | `/api/v1/films`              | GET    | none                                             | `{id: 1, title: "Skyfall", production_year: 2012}`                                                                                                     |
| Get specific film                        | `/api/v1/films/:id`          | GET    | none                                             | `{id: 1, title: "Skyfall", production_year: 2012}`                                                                                                     |
| Get all the films of a specific director | `/api/v1/director/:id/films` | GET    | none                                             | `{id: 1, title: "Skyfall", production_year: 2012}`                                                                                                     |
| Add film                                 | `/api/v1/films`              | POST   | `{title: <String>, production_year: <Integer> }` | `{id: 2, title: "Skyfall", production_year: 2012, created_at: "2019-11-25 03:12:12.102699-07", updated_at: "2019-11-25 03:12:12.102699-07" }`          |
| Add director                             | `/api/v1/directors`          | POST   | `{first_name: <String>, last_name: <String>`     | `{id: 4, first_name: "Sam", last_name: "Mendes", film_id: 2 created_at: "2019-11-25 03:12:12.102699-07", updated_at: "2019-11-25 03:12:12.102699-07"}` |
| Remove director                          | `/api/v1/directors/:id`      | DELETE | none                                             | 204 status code, no response body content                                                                                                              |

### The **database** can be found in Heroku [here](https://edb-byob.herokuapp.com/).

## Project Management Tool: ClubHouse.io

<img width="1440" alt="Screen Shot 2019-11-25 at 4 56 43 AM" src="https://user-images.githubusercontent.com/48811985/69538647-b11b3b00-0f7a-11ea-938d-eae3c16a54a1.png">

link to ClubHouse [here](https://app.clubhouse.io/edwindelbosque/stories/space/9/everything)
