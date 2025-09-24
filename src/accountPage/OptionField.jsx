const OptionField = ({ id, text, value, checked, onChange }) => {
  return (
    <div className='text-sm mb-3.5'>
      <div className='cursor-pointer flex items-center'>
        <input
          type='radio'
          name='deleteStrategy'
          readOnly
          tabIndex={0}
          value={value}
          id={id}
          checked={checked}
          onChange={onChange}
          className='bg-white '
        />
        <label className='radioLabel' htmlFor={id}>
          {text}
        </label>
      </div>
    </div>
  );
};

export default OptionField;
