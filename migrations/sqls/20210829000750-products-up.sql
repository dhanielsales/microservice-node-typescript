CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4 (),
    name VARCHAR NOT NULL,
    PRIMARY KEY (id)
);
