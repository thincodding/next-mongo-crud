import { Schema,model, models} from "mongoose";


const products = new Schema({
    productName: {
        type: String,
    },
    qty: {
        type: Number
    },
    price: {
        type: Number
    }
}, {timestamps: true})

const Product = models.product || model("product", products);

export default Product;