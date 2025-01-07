const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
      {/*<h1>{props.course}</h1>*/}
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {' '}
        {props.part} {props.excercise}
      </p>
      {/*
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
      */}
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} excercise={props.parts[0].exercises} />
      <Part part={props.parts[1].name} excercise={props.parts[1].exercises} />
      <Part part={props.parts[2].name} excercise={props.parts[2].exercises} />
      {/*part1 = {props.part1} 
        exercises1 = {props.exercises1}
        part2 = {props.part2}
        exercises2 = {props.exercises2}
        part3 = {props.part3}
        exercises3 = {props.exercises3}
      />*/}
      {/*<p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>*/}
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of excersises{' '}
        {props.total[0].exercises +
          props.total[1].exercises +
          props.total[2].exercises}{' '}
      </p>
    </div>
  );
};

const App = () => {
  {
    /*const course = 'Half Stack application development';  
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
const exercises3 = 14;*/
  }
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course.name} />
      {/*<h1>{course}</h1>*/}
      <Content parts={course.parts} />
      {/*part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
  />*/}
      {/*<p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>*/}
      <Total total={course.parts} />
      {/*<Total total={exercises1 + exercises2 + exercises3} />*/}
      {/*<p>Number of exercises {exercises1 + exercises2 + exercises3}</p>*/}
    </div>
  );
};

export default App;
