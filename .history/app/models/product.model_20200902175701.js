module.exports = mongoose => {
    const Product = mongoose.model(
      "product",
      mongoose.Schema(
        {
            id:Number,
            title:String,
            price:Number,
            description:String,
            categoty:String,
            image:String
        },
        { timestamps: true }
      )
    );
  
    return Product;
  };