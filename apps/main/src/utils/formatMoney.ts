export const formatVNDMoney = (money: number) => {
  if (money === 0) {
    return '0';
  }

  const formattedMoney = money.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formattedMoney.replace('₫', '').trim();
};
