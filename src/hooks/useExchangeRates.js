const useExchangeRates = (amount, fromCode, toCode, rates) => {
  if (!rates[fromCode] || !rates[toCode]) {
    throw new Error(`Missing rate for ${fromCode} or ${toCode}`);
  }
  const usdAmount = amount / rates[fromCode];
  return usdAmount * rates[toCode];
};

// calculating total amount per account types

const getTotalAmt = (account, toCode, rates, isNetWorth = false) => {
  const amounts = [];
  const currencies = account.map((acc) => acc.currencies);

  currencies.forEach((acc) => {
    return acc.forEach((amt) => {
      if (isNetWorth)
        amounts.push(useExchangeRates(amt.amount, amt.code, toCode, rates));
      else
        amt.enabled
          ? amounts.push(useExchangeRates(amt.amount, amt.code, toCode, rates))
          : null;
    });
  });

  return amounts.reduce((cur, acc) => cur + acc, 0);
};

export { getTotalAmt };
