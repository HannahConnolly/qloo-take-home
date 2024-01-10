# Endpoint explanation

### Get pokemon 

uses the pokemon API to get a pokemon by ID or if no ID is supplied it will get a random pokemon

```
Endpoint: /pokemon/:pokemonName
Method: GET
Description: Fetch detailed information about a specific Pokemon.
Example Request: /pokemon/1
```

### Process team

uses the pokemon supplied by the get pokemon API to give you statistics on your built team including pokemon types, strengths and weaknesses .

```
Endpoint: /pokemon/team-builder
Method: POST
Description: Build and analyze a Pokemon team based on selected Pokemon.
```