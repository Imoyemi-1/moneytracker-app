const useExchangeRates = (amount, fromCode, toCode, rates) => {
  if (!rates[fromCode] || !rates[toCode]) {
    throw new Error(`Missing rate for ${fromCode} or ${toCode}`);
  }
  const usdAmount = amount / rates[fromCode];
  return usdAmount * rates[toCode];
};

const getTotalAmt = (account, toCode, rates) => {
  const amounts = [];
  const currencies = account.map((acc) => acc.currencies);

  currencies.forEach((acc) => {
    return acc.forEach((acct) =>
      amounts.push(useExchangeRates(acct.amount, acct.code, toCode, rates))
    );
  });

  return amounts.reduce((cur, acc) => cur + acc, 0);
};

export { getTotalAmt };
