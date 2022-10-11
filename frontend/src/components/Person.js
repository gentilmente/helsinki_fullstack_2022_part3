const Person = ({ person, handler }) => {
  return (
    <li>
      {person.name}: {person.number}{" "}
      <button onClick={() => handler(person)}>delete</button>
    </li>
  );
};
export default Person;
