var express = require('express')
var router = express.Router()

// Route index page
// router.get('/', function (req, res) {
//   res.render('index')
// })

router.get('/', function (req, res) {
  res.redirect('/docs/core/contents')
})

// Route new page, with title copy

// Care Cost Calculator Flow

// router.get('/typeOfCare', function (req, res) {
//   var option = req.query.typeOfCare
//   if (option === 'dom') {
//     res.redirect('app/care-contribution-calculator/your-home')
//   }
//   else {
//     res.render('app/care-contribution-calculator/savings-and-investments')
//   }
// })

// router.get('/savingsAndInvestment', function (req, res) {
//     res.redirect('app/care-contribution-calculator/pensions')
// })

// router.get('/yourHome', function (req, res) {
//     res.redirect('app/care-contribution-calculator/pensions')
// })

// router.get('/pensions', function (req, res) {
//     res.redirect('app/care-contribution-calculator/rental-income')
// })

// router.get('/rentalIncome', function (req, res) {
//     res.redirect('app/care-contribution-calculator/benefits')
// })

// router.get('/benefits', function (req, res) {
//     res.redirect('app/care-contribution-calculator/other-income')
// })

// router.get('/otherIncome', function (req, res) {
//     res.redirect('app/care-contribution-calculator/personal-allowance')
// })

// router.get('/personalAllowance', function (req, res) {
//     res.redirect('app/care-contribution-calculator/results')
// })



module.exports = router


// router.get('/careneedsAssessed', function (req, res) {
//   var option = req.query.careneedsAssessed
//   if (option === 'yes') {
//     res.redirect('declare-finances')
//   }
//   else {
//     res.render('needs-assessment')
//   }
// })


// // FINANCIAL CHECKER FORM

// // accomodation

// router.get('/accomodationType', function (req, res) {
//   var option = req.query.accomodationType
//   if (option === 'flat-house') {
//     res.redirect('financial-checker/savings-and-investment')
//   }
//   else {
//     res.render('financial-checker/where-do-you-live')
//   }
// })

// // savings and investments

// router.get('/savingsValue', function (req, res) {
//   var option = req.query.savingsValue
//   if (option === 'over') {
//     res.redirect('financial-checker/self-funded-care')
//   }
//   else {
//     res.render('financial-checker/age')
//   }
// })

// // age

// router.get('/howOld', function (req, res) {
//     res.redirect('financial-checker/benefits')
// })

// // benefits

// router.get('/benefits', function (req, res) {
//     res.redirect('financial-checker/rent-property')
// })


// // rent out property

// router.get('/rentProperty', function (req, res) {
//     res.redirect('financial-checker/pensions')
// })


// // pensions

// router.get('/pensions', function (req, res) {
//     res.redirect('financial-checker/other-income')
// })


// // other income

// router.get('/otherIncome', function (req, res) {
//     res.redirect('financial-checker/part-funded-care')
// })


// // financial-assessment-explained


// // FINANCIAL ASSESSMENT FORM

// // needs assessment confirmation

// router.get('/careneedsAssessed', function (req, res) {
//   var option = req.query.careneedsAssessed
//   if (option === 'yes') {
//     res.redirect('declare-finances')
//   }
//   else {
//     res.render('needs-assessment')
//   }
// })

// // declaration of finances

// router.get('/declareFinances', function (req, res) {
//   var option = req.query.declareFinances
//   if (option === 'yes') {
//     res.redirect('bank-accounts-savings')
//   }
//   // if (option === 'between') {
//   //   res.redirect('private-pension')
//   // }
//   else {
//     res.render('end-financial-assessment')
//   }
// })

// // confirm bank accounts, savings and investments

// router.get('/bankAccounts', function (req, res) {
//   var option = req.query.bankAccounts
//   if (option === 'yes') {
//     res.redirect('bank-accounts-savings')
//   }
//   else {
//     res.render('bank-accounts-savings')
//   }
// })
