DROP TABLE IF EXISTS pokemons;

CREATE TABLE pokemons (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    hp INTEGER NOT NULL
)