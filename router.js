const express = require("express")
const router = express.Router()
const items = require("./items")


router.get('/items', function (request,response,next) {
 try{return response.send({items : items})  } 
     

     catch(e){
        return next(e)
     }

})

router.post('/items', function(request,response,next){
    try{
        let newItem = {name :request.body.name, price: request.body.price}
        items.push(newItem)
        response.send({added : newItem}) 
    } 

    catch(e){ return next(e) }

})


router.get('/items/:search_item', function(request,response){
    
    let search_item = request.params.search_item
    let found_item = items.find((i => i.name === search_item))
    if(found_item){
        response.json(found_item)
    
    }

    else {
        response.json("Item not found")
    }
    
    })
    
router.patch('/items/:search_item', function(request,response,next) {
try{
    let search_item = request.params.search_item
    let found_item = items.find((i => i.name === search_item))
    found_item.name = request.body.name
    found_item.price = request.body.price
    console.log(items)

    return response.json({updated : found_item})
}

catch(e){
    return next(e)
}

})

router.delete('/items/:search_item', function(request,response,next){
    try{
    let search_item = request.params.search_item
    let filtered_array = items.filter(item => item.name !== search_item)

    return response.json({items: filtered_array})
    }

    catch(e){

        return next(e)
    }

})
module.exports = router