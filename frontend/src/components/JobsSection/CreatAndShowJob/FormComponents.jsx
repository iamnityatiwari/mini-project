import React from 'react';

const FormComponents = ({ title, type, isRequired, name, handleChange, data, options }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700">
        {title}
        {isRequired && <sub className="text-red-600">*</sub>}
      </label>

      {type === 'select' ? (
        <select
          name={name}
          value={data}
          onChange={handleChange}
          required={isRequired}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select {title}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={data}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required={isRequired}
        />
      )}
    </div>
  );
};

export default FormComponents;
