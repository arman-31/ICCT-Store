import React, { useState } from "react";

// Define types for the Select components
interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  children: React.ReactNode;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  value: string;
}

// Create the Select component
const Select: React.FC<SelectProps> = ({ value, onChange, children }) => {
  return <div className="select-container">{children}</div>;
};

// Create the SelectTrigger component
const SelectTrigger: React.FC<SelectTriggerProps> = ({ children }) => {
  return (
    <div className="select-trigger" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
};

// Create the SelectValue component
const SelectValue: React.FC<SelectValueProps> = ({ value }) => {
  return <div className="select-value">{value}</div>;
};

// Create the SelectContent component
const SelectContent: React.FC<SelectContentProps> = ({ children }) => {
  return <div className="select-content">{children}</div>;
};

// Create the SelectItem component
const SelectItem: React.FC<SelectItemProps> = ({ value, children }) => {
  return (
    <div
      className="select-item"
      onClick={() => {
        // handle item selection
        alert(`You selected: ${value}`);
      }}
    >
      {children}
    </div>
  );
};

// Example usage of the Select components
const App: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <Select value={selectedValue} onChange={handleChange}>
      <SelectTrigger>
        <SelectValue value={selectedValue || "Select an option"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
};

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue,  };
