module.exports = function (product, productDetails) {

    if (productDetails.name)
        product.name = productDetails.name
    if (productDetails.category)
        product.category = productDetails.category
    if (productDetails.image)
        product.image = productDetails.image
    if (productDetails.status)
        product.status = productDetails.status
    if (productDetails.modelNo)
        product.modelNo = productDetails.modelNo
    if (productDetails.vendor)
        product.vendor = productDetails.vendor
    if (productDetails.price)
        product.price = productDetails.price
    if (productDetails.quantity)
        product.quantity = productDetails.quantity
 if (productDetails.size)
        product.size = productDetails.size
        if (productDetails.brand)
        product.brand = productDetails.brand
    if (productDetails.warrentyStatus)
        product.warrentyStatus = productDetails.warrentyStatus
    if (productDetails.warrentyPeriod)
        product.warrentyPeriod = productDetails.warrentyPeriod
    if (productDetails.color)
        product.color = productDetails.color
    if (productDetails.manuDate)
        product.manuDate = productDetails.manuDate
    if (productDetails.expiryDate)
        product.expiryDate = productDetails.expiryDate
    if (productDetails.purchasedDate)
        product.purchasedDate = productDetails.purchasedDate
     if (productDetails.isReturnEligible)
        product.isReturnEligible = productDetails.isReturnEligible
    if (productDetails.returnedDate)
        product.returnedDate = productDetails.returnedDate
    if (productDetails.salesDate)
        product.salesDate = productDetails.salesDate
    if(productDetails.offer)
    product.offer=typeof(productDetails.offer)==="string"
    ?productDetails.offer.split(',')
    :productDetails.offer
    
    if(productDetails.tags)
    product.tags=typeof(productDetails.tags)==="string"
    ? productDetails.tags.split(',')
    :productDetails.tags
    if(!product.discount)
    product.discount={}
    if(product.discount.discountedItem)
    product.discount.discountedItem=productDetails.discount.discountedItem
    if(product.discountType)
    product.discount.discountType=productDetails.discount.discountType
    if(product.discountValue)
    product.discount.discountValue=productDetails.discount.discountValue




    return product;


}