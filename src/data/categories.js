export const CATEGORIES = [
  { id: 'revenue', label: 'Revenue', color: 'green' },
  { id: 'payroll', label: 'Payroll', color: 'slate' },
  { id: 'software', label: 'Software', color: 'blue' },
  { id: 'marketing', label: 'Marketing', color: 'orange' },
  { id: 'utilities', label: 'Utilities', color: 'yellow' },
  { id: 'travel', label: 'Travel', color: 'purple' },
  { id: 'equipment', label: 'Equipment', color: 'gray' },
  { id: 'freelance', label: 'Freelance', color: 'teal' },
];

export const getCategoryById = (id) => CATEGORIES.find((category) => category.id === id);
