import { RiArrowDropDownFill } from 'react-icons/ri';

const Field = ({ label }) => {
  return (
    // Todo: add accessibility to jsx later

    <div>
      <label className='font-medium mb-1 text-sm'>{label}</label>
      <div>
        <input type='text' />
        <div></div>
        <RiArrowDropDownFill />
        <div></div>
      </div>
    </div>
  );
};

export default Field;
