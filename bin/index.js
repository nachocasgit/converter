const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res)=>{

    res.send('hola mundo');

});


app.get('/converter', (req, res)=>{
    let {convertFrom, convertTo, value} = req.query;

    if(
        convertFrom === undefined 
        || convertFrom === '' 
        || convertTo === undefined 
        || convertFrom === '' 
        || value === undefined 
        || value === ''
    ) {

        return res.json({status:false, value: 'Los datos no pueden ser leidos'});

    }

    switch(convertFrom){
        case 'binary':{
            value = '0b' + value;
            break;
        }
        case 'octal':{
            value = '0o' + value;
            break;
        }  
        case 'decimal':{
            value = value;
            break;
        }  
        case 'hexadecimal':{
            value = '0x' + value;
            break;
        }   
        default:{
            res.status(400).json({
                status: false,
                value: 'ConvertFrom no es valido, porfavor realice la consulta nuevamente'
            });
        }   
    }

    console.log(value);

    if(isNaN(value)){
        res.status(400).json({
            status: false,
            value: 'ConvertFrom no es valido, porfavor verifique'
        });
    }


    switch(convertTo){
        case 'binary':{
            res.status(200).json({
                status: true,
                value: Number(value).toString(2)
            });
        }
        case 'octal':{
            res.status(200).json({
                status: true,
                value: Number(value).toString(8)
            });
        }  
        case 'decimal':{
            res.status(200).json({
                status: true,
                value: Number(value).toString(10)
            });
        }  
        case 'hexadecimal':{
            res.status(200).json({
                status: true,
                value: Number(value).toString(16)
            });
        }   
        default:{
            res.status(400).json({
                status: false,
                value: 'ConvertTo no es valido, porfavor realice la consulta nuevamente'
            });
        }   
    }


});


app.listen(port, ()=>{

    console.log(`Servidor esta corriendo en http://localhost:$(port)`);

});