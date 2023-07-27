import { query } from "../api/lib/db";

export default async function handler(req, res) {
    let message;
    let products;

    if (req.method === "GET") {
        const products = await query ({
        query:"SELECT * FROM products",
        values:[],
    })
    res.status(200).json({ products: products });
    }

    if(req.method === "POST"){
        const PName = req.body.Name;
        const addProduct = await query ({
            query:"INSERT INTO products (Name) VALUES (?)",
            values:[PName],
        });
        if (addProduct.insertId){
            message = "Success";
        }
        else{
            message = "Error";
        }
        let product = {
            Name: PName,
        };
        res.status(200).json({ response: { message: message, product: product }});
    }

    if(req.method === "PUT"){
        const PName = req.body.Name;
        const PId = req.body.id;

        const updateProduct = await query ({
            query:"UPDATE products SET Name = ? WHERE id = ?",
            values:[PName, PId],
        });
        const result = updateProduct.affectedRows; 
        if (result){
            message = "Success";
        }
        else{
            message = "Error";
        }
        const product = {
            id: PId,
            Name: PName,
        };
        res.status(200).json({ response: { message: message, product: product }});
    }


    if(req.method === "DELETE"){
        const PId = req.body.id;

        const deleteProduct = await query ({
            query:"DELETE FROM products WHERE id = ?",
            values:[PId],
        });
        const result = deleteProduct.affectedRows; 
        if (result){
            message = "Success";
        }
        else{
            message = "Error";
        }
        res.status(200).json({ response: { message: message, id: PId }});
    }
}