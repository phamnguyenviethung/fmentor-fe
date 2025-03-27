export const formatVNDMoney = (money: number | null | undefined) => {
  if (money === 0 || !money) {
    return '0';
  }

  const formattedMoney = money.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formattedMoney.replace('₫', '').trim();
};
