const express = require('express');
const router = express.Router();

const Employee = require('../models/employee');

//get all employees (index page)
router.get('/', async (req, res, next) => {
  console.log(req.body, '<-req.body from get all')
    try  {
      const allEmployees = await Employee.find();
      console.log(req.session, ' this is req.session')
      // This is the response to react
      res.json({
        status: {
          code: 200,
          message: "Success", // everything worked on the server http codes
        },
        data: allEmployees
      });
    } catch (err){
      console.log(err, 'err in express app get allEmps get route')
      res.send(err)
    }
});

//create new employee route
router.post('/', async (req, res) => {
  try {
    console.log(req.body, ' this is req.body');
    console.log(req.session, ' req.session in post route')
    const createdEmployee = await Employee.create(req.body);
    res.json({
      status: {
        code: 201,
        message: "Resource successfully created"
      },
      data: createdEmployee
    });
  } catch(err){
    console.log(err);
    res.send(err);
  }
});

//single employee show page
router.get('/:id', async (req, res, next) => {
    try  {
        const foundEmployee = await Employee.findById(req.params.id);
        res.json({
          status: {
            code: 200,
            message: "Success"
          },
          data: foundEmployee
        });

      } catch (err){
        res.send(err);
      }
});

//update employee route
router.put('/:id', async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json({
      status: {
            code: 200,
            message: "resource updated successfully"
          },
      data: updatedEmployee
    });
  } catch(err){
    res.send(err)
  }
});

// Delete employee route
router.delete('/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndRemove(req.params.id);
      res.json({
        status: {
            code: 200,
            message: "Resource deleted successfully"
          },
          data: deletedEmployee
      });
  } catch(err){
    res.send(err);
  }
});

module.exports = router;
