var express = require('express');
var router = express.Router();

const currencies = ["JPY", "USD", "TWD"]

const currenciesJsonStr = `{
  "currencies": {
    "TWD": {
      "TWD": 1,
      "JPY": 3.669,
      "USD": 0.03281
    },
    "JPY": {
      "TWD": 0.26956,
      "JPY": 1,
      "USD": 0.00885
    },
    "USD": {
      "TWD": 30.444,
      "JPY": 111.801,
      "USD": 1
    }
  }
}`

const response = {
  Msg: "",
  Amount: ""
};


let conversion;

try {
    conversion = JSON.parse(currenciesJsonStr);
} catch (err) {
    console.error(err);
    process.exit(1);
}

const currencyMap = {};
for (const source in conversion.currencies) {
    currencyMap[source] = {};
    for (const target in conversion.currencies[source]) {
        currencyMap[source][target] = conversion.currencies[source][target];
    }
}

router.get('/', function(req, res, next) {
  const sourceCurrency = req.query.source || "";
  const targetCurrency = req.query.target || "";
  let amountStr = req.query.amount || "";

  if (!amountStr.includes("$")) {
    response.Msg = "Amount Format Error"
    res.status(400).json(response);
    return;
  }
  amountStr = amountStr.replace(/[$,]/g,"")

  if (!isCurrencyVal(sourceCurrency)){
    response.Msg = "Source Format Error"
    res.status(400).json(response);
    return;
  }

  if (!isCurrencyVal(targetCurrency)){
    response.Msg = "Target Format Error"
    res.status(400).json(response);
    return;
  }

  const amount = parseFloat(amountStr);

  if (isNaN(amount)) {
    response.Msg = "amount Format Error"
    res.status(400).json(response);
    return;
  }

  let formattedAmount = (currencyMap[sourceCurrency][targetCurrency]*amount).toFixed(2)
  let [integerPart,decimalPart] = formattedAmount.split(".")
  integerPart = addCommas(integerPart)

  response.Msg = "success"
  response.Amount = "$"+integerPart+"."+decimalPart
  res.status(200).json(response);
    return;
});

function isCurrencyVal(currency) {
  return currencies.includes(currency)
}

function addCommas(s){
  const n = s.length
  if (n <= 3) {
    return s
  }
  return addCommas(s.slice(0,n-3)) +","+s.slice(n-3)
}

module.exports = router;
