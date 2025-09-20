import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';
import { MdOutlineEdit } from 'react-icons/md';

const TransactionSection = () => {
  const { transactions } = useContext(AppContext);
  console.log(transactions);

  const transactionList = transactions.map((list) => (
    <div key={list.id}>
      <div>{list.date}</div>
      <div>
        {list.accountTransactionInfo[0]?.name}
        {list.accountTransactionInfo[1]?.name}
        {list.tags.map((tag, index) => (
          <div key={index}>{tag}</div>
        ))}
        {list.note && <span>{list.note}</span>}
      </div>
      <div>
        <span>
          {list.accountTransactionInfo[0]?.amount}{' '}
          {list.accountTransactionInfo[0]?.code}
        </span>{' '}
        {list.accountTransactionInfo[1]?.code !==
        list.accountTransactionInfo[0]?.code ? (
          <span>
            {list.accountTransactionInfo[1]?.amount}{' '}
            {list.accountTransactionInfo[1]?.code}
          </span>
        ) : null}
      </div>
      <div>
        <button>
          <MdOutlineEdit />
        </button>
      </div>
    </div>
  ));
  return transactions.length > 0 ? (
    transactionList
  ) : (
    <div className='px-3.5 text-sm min-h-12.5 flex items-center'>
      No transactions found.
    </div>
  );
};

export default TransactionSection;
