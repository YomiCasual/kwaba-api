export const approveRentAmount = (req, res) => {
  let { amount, tenor, monthlyPayment } = req.body;

  if (!amount || !tenor) {
    return res.status(400).json({
      successful: false,
      message: "Fill in all the required fields",
    });
  }

  amount = parseInt(amount);
  tenor = parseInt(tenor);

  let newInterest = compoundInterest(amount, tenor, 0.02, 1);
  const calculatedMonthlyPayment = (amount / tenor + newInterest).toFixed(2);

  if (monthlyPayment !== calculatedMonthlyPayment) {
    res.status(400).send({
      successful: false,
      message: "Monthly payment incorrect",
    });
  }

  return res.status(200).send({
    successful: true,
    data: monthlyPayment,
  });
};

const compoundInterest = (principal, time, rate, n) => {
  const amount = principal * Math.pow(1 + rate / n, n * time);
  const interest = amount - principal;
  return interest;
};
