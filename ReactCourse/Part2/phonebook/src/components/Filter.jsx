const Filter = ({ filter, onChange }) => {
    return (
      <div>
        Filter shown names: <input value={filter} onChange={onChange} />
      </div>
    );
  };
  
  export default Filter;
  