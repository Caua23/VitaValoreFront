import React from 'react';
import InputMask from 'react-input-mask';

interface CnpjInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

function CnpjInput({ value, onChange, placeholder = "Digite seu CNPJ", required = false }: CnpjInputProps) {
  return (
    <div className="form-group">
      <label>CNPJ</label>
      <InputMask
        mask="99.999.999/9999-99"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      >
        {/* {(inputProps: any) => <input {...inputProps} type="text" className="form-control" />} */}
      </InputMask>
    </div>
  );
}

export default CnpjInput;
