const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, tooltipRef }) => {
  return (
    isOpen && (
      <div
        ref={tooltipRef}
        className='absolute  z-50 h-fit  left-4 -top-8.5 mb-3.5 confirm-delete-con'
      >
        <div className='bg-white rounded confirm-delete  w-55 p-3 text-center flex flex-col items-end'>
          <p className=' font-semibold '>Local data will be deleted!</p>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className='bg-red-600 text-white cursor-pointer py-1.5 px-6 rounded hover:bg-red-700 transition-colors mt-3.5 w-fit'
          >
            Confirm
          </button>
        </div>
      </div>
    )
  );
};

export default ConfirmDeleteModal;
