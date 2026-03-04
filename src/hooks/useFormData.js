import { useState } from 'react';

/**
 * Custom hook for managing form state with a generic change handler.
 * @param {object} initialState - The initial form field values
 * @returns {{ formData: object, setFormData: Function, handleChange: Function, resetForm: Function }}
 */
export const useFormData = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => setFormData(initialState);

  return { formData, setFormData, handleChange, resetForm };
};
