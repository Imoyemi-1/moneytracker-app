import { createPortal } from 'react-dom';
import { useAsideBar } from '../contexts/aside';
import { useContext, useEffect } from 'react';
import { AppContext } from '../contexts/AppContext';
import clsx from 'clsx';

const Modal = ({ content }) => {
  const { isOpenSidebar, setOpenSidebar } = useAsideBar();
  const { isEditMode, resetStateEdit } = useContext(AppContext);
  const isOpen = isOpenSidebar || isEditMode;
  useEffect(() => {
    const body = document.body;
    if (isOpen) body.classList.add('overflow-hidden');
    else body.classList.remove('overflow-hidden');

    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    //  remove modal is dropdown is close
    createPortal(
      <div
        onClick={() => {
          setOpenSidebar(false);
          resetStateEdit();
        }}
        className={clsx(
          'flex opacity-100 fixed top-0 left-0 w-full h-full p-3.5 bg-[rgba(0,0,0,.85)] z-40 overflow-auto',
          isEditMode && 'z-50'
        )}
      >
        {content}
      </div>,
      document.body
    )
  );
};

export default Modal;
