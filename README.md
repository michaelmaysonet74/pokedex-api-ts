# pokedex-api-ts

Microservice for fetching Pokémon data.

## Getting Started

### Requirements

Bun `v1.3.11`

### Usage

Install dependencies:

```sh
bun install
```

Start the server:

```sh
bun run dev
```

The application will start on http://localhost:8080.

#### Docker

If you prefer to run this service in a Docker container, you can do so by following these steps:

Build the Docker image:
```sh
docker build -t pokedex_api .
```

Run the Docker container:
```sh
docker run -p 8080:8080 pokedex_api
```

## API Endpoints

- Get Pokemon by ID
    - URL: `/api/v1/pokemon/{id}`
    - Method: `GET`
    - Description: Fetches information about a Pokemon by its ID.

- Get Pokemon by Name
    - URL: `/api/v1/pokemon?name={name}`
    - Method: `GET`
    - Description: Fetches information about a Pokemon by its name.

### Example Requests

- Fetch Pokemon by ID:

  `curl -X GET "http://localhost:8080/api/v1/pokemon/25"`

- Fetch Pokemon by Name:

  `curl -X GET "http://localhost:8080/api/v1/pokemon?name=Pikachu"`

## GraphQL Support

This project also includes support for GraphQL.

### GraphQL Endpoint

- URL: `/graphql`
- Method: `POST`
- Description: Endpoint to handle GraphQL queries.

### Example GraphQL Queries

- Query Pokemon by ID:

```gql
query {
  pokemonById(id: 25) {
    id
    name
    types
    # Add more fields here
  }
}
```

- Query Pokemon by Name:

```gql 
query {
  pokemonByName(name: "Pikachu") {
    id
    name
    types
    # Add more fields here
  }
}
```
