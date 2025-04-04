import React, { useState, useEffect } from 'react';
import '../Popup.css';

interface PopupFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  fields: string[];
  initialData?: { [key: string]: string };
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FormData {
  [key: string]: string;
}

const PopupForm: React.FC<PopupFormProps> = ({ isOpen, onClose, onSubmit, fields, initialData = {}, onInputChange }) => {
  const [formData, setFormData] = useState<FormData>(initialData);

  // Sync formData with initialData whenever initialData changes
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'date' || type === 'datetime-local') {
      setFormData({ ...formData, [name]: value });
    } else {
      if (onInputChange) {
        onInputChange(e);
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = { ...formData };

    // Format date or timestamp fields if necessary
    fields.forEach((field) => {
      if (formData[field]) {
        if (field.includes('date') || field.includes('timestamp')) {
          const date = new Date(formData[field]);
          if (!isNaN(date.getTime())) {
            formattedData[field] = date.toISOString();
          }
        }
      }
    });

    // Call onSubmit and pass the formatted data
    onSubmit(formattedData);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>{initialData ? 'Edit' : 'Add'} Information</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field}>
              <label>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')} {/* Improved label formatting */}
                <input
                  type={field.includes('date') || field.includes('timestamp') ? 'datetime-local' : 'text'}
                  name={field}
                  value={formData[field] || ''}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
