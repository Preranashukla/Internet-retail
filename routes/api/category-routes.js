const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
      attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  });

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    WHERE: {id: req.params.id} ,
    attributes: ['id','category_name'] ,
        include: [{
            model: Product,
            attributes:['product_name']
        }]
    }).then(categoryData =>{
    if (!categoryData) {
        res.status(404).json({
            message: 'No category found with this id!'
            
        });
        return;
    }
    res.status(200).json(categoryData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.post('/', (req, res) => {
  // create a new category
  // create a new category
  Category.create({
    category_name: req.body.category_name
  }).then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {category_name: req.body.category_name}, 
      {
          where: {
              id: req.params.id,
          },
      }
    ).then(categoryData => {
      if (!categoryData) {
          res.status(404).json({
              message: 'No category found with this id'
          });
          return;
      }
      res.status(200).json(categoryData);
  }) .catch (err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(categoryData => {
      if (!categoryData) {
        res.status(404).json({message: 'No matching category found to delete'});
        return;
      }
      res.json("Record Deleted" +categoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;