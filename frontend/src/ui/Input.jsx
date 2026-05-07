export const Input = ({ label, name, type = "text", value, onChange, required }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
    />
  </div>
);