const {Category} = require('./category.model')

module.exports.createCategory = async (req, res) => {
    const name = req.body.name
    try {
        const category = new Category({name})
        await category.save()
        
        return res.status(201).send({
            status: true,
            message: "Category created"
        })
    } catch(err) {
        console.log(err.message)
        return res.status(500).send({
            status: false,
            message: "Internal server error"
        })
    }
}

module.exports.getCategories = async (req, res) => {
    const categories = await Category.find()
        .sort({name: 1})

    return res.status(200).send({
        status: true,
        message: "categories fetched",
        categories        
    })
}