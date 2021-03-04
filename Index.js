
//Configurando express
const express = require("express");
const app = express();

//Configurando body-parser
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//configurando api correios
const Correios = require('node-correios');
const correios = new Correios();


//configurando template engine ejs
app.set("view engine", "ejs");
app.set("views");

//configurando a pasta publica
app.use(express.static("public"));


//rota correios
app.get("/", (req, res) => {
    var Valor = req.body.CEP
    let mensagem =""
  
    //Objeto vazio para receber os dados da api
    let result = {    
      logradouro: '',
      bairro: '',
      localidade: '',
      uf: '',
    }

    res.render("Correios.ejs", {Valor, result, mensagem})
})


//rota post para cep
app.post("/Cep", (req,res)=>{
  var Valor = req.body.CEP
  let mensagem = "Cep Encontrado:"

 //Função de consulta de cep da api 
 correios.consultaCEP({ cep: Valor })
.then(result => {
  res.render('Correios.ejs', {result, mensagem})
  console.log(result);
})
.catch(error => {
 
  console.log(error)
});

  
})

//configuração porta http 3000
app.listen(3000)

