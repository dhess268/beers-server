const express = require('express');
const router = express.Router();

let beers = [
    {
      id: 1,
      name: "512 IPA",
      reviews: [
        {
          id: 1,
          text: "delicious"
        }
      ]
    },
    {
      id: 2,
      name: "Durty Bull Brett",
      reviews: [
        {
          id: 2,
          text: "why is Brett in the name?"
        },
        {
          id: 3,
          text: "Brett, or brat? Yuck!"
        },
        {
          id: 4,
          text: "Mmmm this is so good."
        },
        {
          id: 5,
          text: "Q Dogs!"
        },
        {
          id: 6,
          text: "^ Megan, is that you!?"
        }
      ]
    },
    {
      id: 3,
      name: "Dogfish Head 90 Minute IPA",
      reviews: []
    },
    {
      id: 4,
      name: "Chocolate stout",
      reviews: [
        {
          id: 7,
          text: "too much Chocolate"
        },
        {
          id: 8,
          text: "so yummy"
        },
        {
          id: 9,
          text: "the best!"
        }
      ]
    }
  ]


router.param('beer', function(req, res, next, id) {
  req.beer = beers.find(beer => String(beer.id) === id);
  next();
});

router.param('review', function(req, res, next, id) {
  req.review = req.beer.reviews.find(review => String(review.id) === id)
  next();
});

router.route('/')
  .get((req, res) => {
  res.json(beers);
})
  .post((req, res) => {
    beers.push(req.body)
    res.send(beers)
  })


router.route('/:beer')
  .get((req, res) => {
    res.send(req.beer)
  })
  .put((req, res) => {
    req.beer = req.body
    res.send(req.beer)
  })
  .delete((req, res) => {
    beers = beers.filter(beer => {
      return beer.id != req.params.beer
    })
    res.send(beers)
  })

router.route('/:beer/reviews')
  .get((req, res) => {
    res.json(req.beer.reviews)
  })
  .post((req, res) => {
    req.beer.reviews.push(req.body)
    res.send(req.beer.reviews)
  })

router.route('/:beer/reviews/:review')
  .get((req, res) => {
    res.json(req.review)
  })
  .put((req, res) => {
    req.review.text = req.body.text
    res.json(req.review)
  })
  .delete((req, res) => {
    req.beer.reviews = req.beer.reviews.filter(review => {
      return review.id != req.params.review
    })
    res.send(req.beer.reviews)
  })

// PUT /beers/:beer
// router.put('/')


module.exports = router;