var Receita = require('../model/receita');
var Ingrediente = require('../model/ingrediente');
var operations = {};

operations.save = function (titulo, descricaoIngredientes, ingredientesBase, modoPreparo, callback) {
    const receita = new Receita({
        "titulo": titulo,
        "descricaoIngredientes": [descricaoIngredientes],
        "ingredientesBase": [ingredientesBase],
        "modoPreparo": [modoPreparo]
    });
    receita.save(function (error, receita) {

        if (error) {
            callback({ error: 'não foi possível salvar' });
        } else {
            callback(receita);
        }

    });
}

operations.getReceitasById = function (req, res) {
    var id = req.params.id;
    Receita.findById(id, function (error, resultado) {

        if (error) {
            res.status(401).send({ error: 'não foi possível encontrar a receita' });
        } else {
            res.status(200).json(resultado);
        }
    });
}


operations.getReceitasByIngredientes = function (req, res) {
    //console.log('Teste vindo aqui');
    var ingredientesBase = req.query.ingredientesBase;
    console.log(ingredientesBase);
    Receita.aggregate([
        {
            $match: {
                ingredientesBase: {
                    $in: ingredientesBase
                }
            }
        },
        {
          $project: {
            titulo: 1,
            descricaoIngredientes: 1,
            ingredientesBase: 1,
            modoPreparo: 1,
            qtdIngredientesCompativeis: {
                $size: {
                    $setIntersection: [ingredientesBase, "$ingredientesBase" ]
                }
            }
          }  
        }, 
        {
            $sort: {
                qtdIngredientesCompativeis: -1
            }
        }
    ],
    function (err, result) {
        if (err) {
            res.status(401).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}


operations.getQtdReceitasByIngredientes = function (req, res) {
    //console.log('Inicio');
    var ingredientesBase = req.query.ingredientesBase;
    console.log(ingredientesBase);
    Receita.aggregate([
        {
            $match: {
                ingredientesBase: {
                    $in: ingredientesBase
                }
            }
        },
        {
          $project: {
            titulo: 1,
            descricaoIngredientes: 1,
            ingredientesBase: 1,
            modoPreparo: 1,
            qtdIngredientesCompativeis: {
                $size: {
                    $setIntersection: [ ingredientesBase, "$ingredientesBase" ]
                }
            }
          }  
        }, 
        {
            $sort: {
                qtdIngredientesCompativeis: -1
            }
        },
        {
            $count:"qtdReceitasEncontradas"
        }
    ],
    function (err, result) {
        //console.log('Chegou aqui');
        if (err) {
            res.status(401).json(err);
        } else {
            res.status(200).json(result);
        }
    });
}

operations.postCadastrareceita = function(req,res){
    var receita = new Receita({
        titulo: req.body.titulo,
        descricaoIngredientes: req.body.descricaoIngredientes,
        ingredientesBase: req.body.ingredientesBase,
        modoPreparo: req.body.modoPreparo
          
});
    receita.save(function (error, receita) {
    if (error) {
        res.status(401).send({ error: 'não foi possível cadastrar a receita' });
    } else {
        res.status(200).json(receita);
        }
    });
}

module.exports = operations;