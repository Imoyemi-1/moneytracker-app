import { IoMdArrowDropdown } from 'react-icons/io';

const Section = ({ title, isNetWorth, sectionBody }) => {
  return (
    <section className='cursor-pointer text-[rgb(0,0,0,0.87)]'>
      <div className='flex items-center'>
        <div className='flex flex-1 items-center py-4 pl-2 text-xl font-roboto'>
          <IoMdArrowDropdown />
          <h3 className='uppercase  left-[0.175rem] whitespace-nowrap '>
            {title}
          </h3>
        </div>
        {isNetWorth && (
          <div className='pr-4 font-bold text-right text-[1.455rem] font-mono'>
            <span>100 NGN</span>
          </div>
        )}
      </div>
      {sectionBody}
    </section>
  );
};

export default Section;
