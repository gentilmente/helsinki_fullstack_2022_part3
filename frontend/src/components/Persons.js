import Person from "./Person";

const Persons = ({ persons, filter, remove }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {persons.map((pers) =>
          pers.name.includes(filter) ? (
            <Person
              key={pers.name}
              person={pers}
              handler={() => remove(pers)}
            />
          ) : null
        )}
      </ul>
    </div>
  );
};

export default Persons;
