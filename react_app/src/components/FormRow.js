const FormRow = ({ type, name, value, handleChange }) => {
  const inputId = `${name}-input`;

  return (
    <div className="form-row">
      <label htmlFor={inputId} className="form-label">
        {name}
      </label>
      <input
        type={type}
        value={value}
        id={inputId}
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
