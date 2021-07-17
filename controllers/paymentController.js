function calculateMonthlyPayment(
  principal,

  lengthOfLoan,
  rate
) {
  rate = rate / 100 / 12;

  var e = Math.pow(1 + rate, lengthOfLoan);
  var m = principal * ((rate * e) / (e - 1));
  return m;
}

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

  let newInterest = calculateMonthlyPayment(amount, tenor, 2);
  const calculatedMonthlyPayment = newInterest.toFixed(2);

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
