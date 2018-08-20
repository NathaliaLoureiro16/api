
var Ingrediente = require('../model/ingrediente');
var operations = {};
operations.getIngredientesByCategoria = function (req, res) {
    var categoria = req.params.categoria;
    Ingrediente.find({ categoria: categoria }, function (error, resultado) {

        if (error) {
            res.status(401).send({ error: 'não foi possível encontrar as receitas' });
        } else {
            res.status(200).json(resultado);
        }
    });
}

operations.postCadastraingredientes = function(req,res){
    var ingrediente = new Ingrediente({
        imagemCategoria: req.body.imagemCategoria,
        categoria: req.body.categoria,
        ingredientes: req.body.ingredientes
          
});
    ingrediente.save(function (error, ingrediente) {
    if (error) {
        res.status(401).send({ error: 'não foi possível cadastrar o ingrediente' });
    } else {
        res.status(200).json(ingrediente);
        }
    });
}


module.exports = operations;

