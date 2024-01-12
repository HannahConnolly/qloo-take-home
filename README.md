# Endpoint explanation

### Get data (get pokemon) 

uses the pokemon API to get a pokemon by ID or if no ID is supplied it will get a random pokemon

```
Endpoint: get-data/:pokemonName
Method: GET
Description: Fetch detailed information about a specific Pokemon.
Example Request: /pokemon/1
```

### Process data (add pokemon to team)

uses the pokemon supplied by the get pokemon API to give you statistics on your built team including pokemon ID, and type(s).

```
Endpoint: /process-data
Method: POST
Description: Build and analyze a Pokemon team based on selected Pokemon.
```

# Curl Requests:

### get-data (get pokemon from pokemon API )
Return random pokemon
Without pokemon ID: `curl localhost:3001/fetch-data/`

Return pokemon by ID
With    pokemon ID: `curl localhost:3001/fetch-data/1`

### process-data (add recieved pokemon to team)
```
curl -X POST https://localhost:3001/process-data -H "Content-Type: application/json" -d '{"name": "Bulbasaur", "id": 1}'  
```