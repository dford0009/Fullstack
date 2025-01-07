import Note from './components/Note';

const App = ({ notes }) => {
  //const { notes } = props;

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {/*IMPRACTICAL WAY OF SHOWING ELEMENTS IN ARRAY */}

        {/*<li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>*/}

        {/*BETTER WAY OF SHOWING ELEMENTS IN ARRAY BUT THERE IS AN ERROR IN CONSOLE*/}

        {/*{notes.map(note => 
          <li>
            {note.content}
          </li>
        )}*/}

        {/*Each child in a list should have a unique "key" prop.
          So, we need to add the key from the array to the <li> attribute */}

        {/*{notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}*/}

        {/*Separate displaying a single note into its own component */}
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
