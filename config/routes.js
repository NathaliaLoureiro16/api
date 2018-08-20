var router = require('express').Router();
var ingredienteController = require("../controller/ingredienteController.js");
var receitaController = require("../controller/receitaController.js");

router.get('/', function (req, res) {
    res.send("Hello World");
});

router.get('/', function (req, res) {
    res.json({ msg: 'Hello World' });
})

 router.get('/ingredientes/:categoria', ingredienteController.getIngredientesByCategoria);
 router.get('/receitas/:id', receitaController.getReceitasById);
 router.get('/receitas', receitaController.getReceitasByIngredientes);
 router.get('/quantidade/receitas', receitaController.getQtdReceitasByIngredientes);
 router.post('/cadastroreceita', receitaController.postCadastrareceita);
 router.post('/cadastroingrediente', ingredienteController.postCadastraingredientes);


module.exports = router;  