import React from 'react';
import { Form, FormControl } from 'react-bootstrap';

const SearchBar = ({ query, setQuery }) => {
  return (
    <Form className="mb-3">
      <FormControl
        type="text"
        placeholder="Search.."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </Form>
  );
};

export default SearchBar;
