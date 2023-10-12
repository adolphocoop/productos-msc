import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price:{
        type: String,
        default: 0.0,
        
    },
    year:{
        type: Number,
        deafault: 2023,
        required: true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{
    timestamps: true
}
);//Fin de productsSchema
export default mongoose.model('Products', productsSchema)