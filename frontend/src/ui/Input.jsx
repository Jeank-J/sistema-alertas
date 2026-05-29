export const Input = ({ label, name, type = 'text', value, onChange, required }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      className="form-input"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);