import Jogo from '../models/jogo.js'

export default class JogoController{

    constructor(caminhoBase='jogo/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
           
            await Jogo.create({
                nome: req.body.nome,
                ano: req.body.ano,
                genero: req.body.genero,
                desenvolvedor: req.body.desenvolvedor,
                classificacao: req.body.classificacao,
                plataforma: req.body.plataforma,
                preco: req.body.preco
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Jogo.find({})
            res.render(caminhoBase + 'lst', {Jogos:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Jogo.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Jogo:resultado})
        }

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const jogo = await Jogo.findById(id) 
            console.log(jogo)
            res.render(caminhoBase + "edt", 
                {Jogo:jogo})
        }


        this.edt = async(req, res)=>{
        await Jogo.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Jogo.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}