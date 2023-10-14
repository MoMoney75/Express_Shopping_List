process.env.NODE_ENV = "test";
const request = require("supertest")
const app = require("./app");
const items = require("./items");


let steak = {name : "steak", price : 17.99}
beforeEach(function(){
    items.push(steak)
    // console.log(items)
});

afterEach(function(){
    items.pop()
    // console.log(items)
})

describe("get /items" ,function(){
test("gets all items", async function(){
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual(expect.arrayContaining([steak]))

});
});

describe("post /items", function(){
    test("testing posting a new item", async function(){
        const response = await request(app).post("/items").send({name: "almonds", price: 4.65})
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual( { added: { name: 'almonds', price: 4.65 } })
        
    })
});

describe("/get item by name", function(){
    test("test searching item by name", async function(){
        const response = await request(app).get("/items/steak");
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ name: 'steak', price: 17.99 })

    })
})

describe("/patch item", function(){
    test("testing editing item", async function(){
        response = await request(app).patch("/items/steak").send({name : "beef", price : 11.57})
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ updated: { name: 'beef', price: 11.57 } })
    })
})

describe("/delete item", function(){
    test("test deleting item by name", async function(){
        response = await request(app).delete("/items/beef")
        expect(response.statusCode).toBe(200)
        expect(response.body).not.toBe([
            { name: 'cheerios', price: '3.45' },
            { name: 'peanut butter', price: '6.99' },
            { name: 'chicken', price: '11.59' },
            { name: 'donuts', price: '3.25' },
            { name: 'beef', price: 11.57 }
          ]
      )

    })
})


