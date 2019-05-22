const express = require('express'); // importing a CommonJS module

const router = express.Router();
const AccountsModel = require('./data/accounts-model');


router.use((req,res,next)=> {
  console.log('accountRouter yippee');
  next();
})

// custom middleware
const logger = require('./logger'); 
router.use(logger);


// EndPoints

// Adding a new account: using accountModel
router.post('/', async (req, res) => {//validateAccounts
    try {
      const account = await AccountsModel.add(req.body);
      res.status(201).json(account);
    } catch (error) {
      console.log(error);
      next(({message: 'Error getting the posts for the account'}));
    }
  });

// Getting all accounts using AccountsModel
router.get('/', async (req, res) => {
    try {
      const accounts = await AccountsModel.find(req.query);
      res.status(200).json(accounts);
    } catch (error) {
      console.log(error);
      next(({message: 'Error retrieving the accounts Greg'}))
    }
  });

// Getting a specific account using AccountsModel
router.get('/:id', validateAccountId, async (req, res) => {
    try {
        const account = await AccountsModel.findById(req.params.id);
    
        if (account) {
          res.status(200).json(account);
        } else {
        next(({message: 'account not found'}))
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error retrieving the account'}))
      }
});

// Deleting a specific account using AccountsModel
router.delete('/:id', validateAccountId, async (req, res) => {
    try {
        const count = await AccountsModel.remove(req.params.id);
        if (count > 0) {
          res.status(200).json({ message: 'The account has been nuked' });
        } else {
          res.status(404).json({ message: 'The account could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error removing the account'}));
      }
});


// Updating a specific account using AccountsModel
router.put('/:id/', validateAccountId, async (req, res) => {

    try {
        const account = await AccountsModel.update(req.params.id, req.body);
        if (account) {
          res.status(200).json(account);
        } else {
          res.status(404).json({ message: 'The account could not be found' });
        }
      } catch (error) {
        console.log(error);
        next(({message: 'Error updating the account'}));
      }

});

//custom middleware

// Check for accurate accountID AccountsModel
async function validateAccountId (req, res, next) {
    try{
      const { id } = req.params;
      const account = await AccountsModel.findById(id);
      if(account) {
        req.account = account;
        next();
      } else {
        res.status(400).json({message: 'invalid account id'});
      }
    } catch (err) {
        next(({message: 'failed to process async request'}));
    //   res.status(500).json({message:'failed to process async request'})
    } 
  
  }

// Making sure required fields are entered when posting AccountsModel
// function validateAccount(req, res, next) { // post and put requests before async
    
//     if (req.body && Object.keys(req.body).length) {
//     next();
//     } else {
//     next(({message: 'missing account data'}));
//     }
// }


module.exports = router;

