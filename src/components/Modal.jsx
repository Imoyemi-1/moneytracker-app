import { createPortal } from 'react-dom';
import { useAsideBar } from '../contexts/aside';

const Modal = ({ content }) => {
  const { isOpenSidebar, setOpenSidebar } = useAsideBar();
  return (
    <>
      {/* remove modal is dropdown is close */}
      {isOpenSidebar &&
        createPortal(
          <div
            onClick={() => setOpenSidebar(false)}
            className='flex opacity-100 fixed top-0 left-0 w-full h-full p-3.5 bg-[rgba(0,0,0,.85)] z-40'
          >
            {content}
          </div>,
          document.body
        )}
    </>
  );
};

export default Modal;
