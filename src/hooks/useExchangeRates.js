const convertCurrency = (amount, fromCode, toCode, rates) => {
  if (!rates[fromCode] || !rates[toCode]) {
    console.error(`Missing rate for ${fromCode} or ${toCode}`);
  }
  const ratesAmt = rates[fromCode] || 1;
  const usdAmount = amount / ratesAmt;
  return usdAmount * ratesAmt;
};

// calculating total amount per account types

const getTotalAmt = (account, toCode, rates, isNetWorth = false) => {
  const amounts = [];
  const currencies = account.map((acc) => acc.currencies);

  currencies.forEach((acc) => {
    return acc.forEach((amt) => {
      if (isNetWorth)
        amounts.push(convertCurrency(amt.amount, amt.code, toCode, rates));
      else
        amt.enabled
          ? amounts.push(convertCurrency(amt.amount, amt.code, toCode, rates))
          : null;
    });
  });

  return amounts.reduce((cur, acc) => cur + acc, 0);
};

const addTotalNum = (arr) => {
  return arr.reduce((cur, acc) => cur + acc, 0);
};

export { getTotalAmt, convertCurrency, addTotalNum };
