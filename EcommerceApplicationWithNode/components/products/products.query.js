const ProductModel = require('./products.model')
const map_product_req = require('./../../helpers/map_product_req');
const removeFile = require('./../../helpers/removefile')
const NotificationModel = require('../../Models/notification.model')




function find(condition) {
    return ProductModel
        .find(condition) //this find method return promise
        .sort({
            _id: -1
        })
        .populate('reviews.user', { username: 1, firstName: 1 })
        .populate('vendor', { username: 1, email: 1, firstName: 1 })
        .exec(); //return promise
}
function insert(data) {
    var product = new ProductModel({});
    map_product_req(product, data)
    return product.save();

}
function getById(id) {
    return new Promise((resolve, reject) => {
        ProductModel.findById(id, function (err, product) {
            if (err) {
                return reject(err)
            }
            if (!product) {
                return reject({
                    msg: 'product hora not found',
                    status: 404
                })
            }
            resolve(product)

        })
    })

}
function update(id, data) {
    return new Promise((resolve, reject) => {
        ProductModel
            .findById(id, function (err, product) {
              if (err) {
                return reject(err);
              }
              if (!product) {
                return reject({
                  msg: "product not found",
                  status: 404,
                });
              }
              console.log('#####################################'+'\n'+"##############################",data.filestoRemove)
              let oldUpdatedImage=[];
              if(data.filestoRemove && data.filestoRemove.length){
                  
                   oldUpdatedImage=remove_Existiong_oldImage(product.image,data.filestoRemove)
                  console.log(
                    "#...>>>>>>>>>>>>>>>>>>>..................>>>>>>>>>>..................>>>>>>>>>>>>", oldUpdatedImage);
              }
              data.image = oldUpdatedImage;
                            console.log(
                              "data Image is$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$>>>>>",
                              data.image
                            );

              //if existing image are remove is now updated

            //   removeFile(oldImage) //for using through  postman


              map_product_req(product, data);
              if (data.newImages && data.newImages.length) {
                product.image.push(...data.newImages);
              }
              return product.save((err, updated) => {
                if (err) {
                  return reject(err);
                } else {
                  // removeFile(oldImage)//to remove file using postman
                  const newNotification = new NotificationModel({});
                  (newNotification.user_id = data.user_id),
                    (newNotification.category = "General_update"),
                    (newNotification.message = "your product is updated"),
                    newNotification.save();
                  resolve(updated);
                }
              });
            })
            .populate('user_id', { username: 1, firstName: 1 })

    })
}
    function remove_Existiong_oldImage (oldImages =[],filestoRemove=[]){
        oldImages.forEach(function(image,index){
            if (filestoRemove.includes(image)) {
            oldImages.splice(index, 1);
        }
    })
    return oldImages;

        

    
}
function remove(id) {
    return new Promise(function (resolve, reject) {
        ProductModel.findById(id, function (err, product) {
            if (err) {
                return reject(err)
            }
            if (!product) {
                return reject({
                    msg: 'product not found'
                })

            }
            else {
                product.remove(function (err, product) {
                    if (err) {
                        return reject(err)
                    }
                    else {
                        removeFile(product.image)
                        resolve(product)
                    }
                })
            }
        })
    })
}
function addReview(id, addreviewData) {

    return new Promise(function (resolve, reject) {

        ProductModel.findById(id, function (err, product) {
            if (err) {
                return reject(err)
            }
            if (!product) {
                return reject({
                    msg: "product not found",
                    status: 404
                })
            }
            product.reviews.push(addreviewData);
            product.save(function (err, updated) {
                if (err) {
                    return reject(err)
                }
                else {
                    const newNotification = new NotificationModel({});
                    newNotification.user_id = product.vendor,
                        newNotification.category = 'review',
                        newNotification.message = `you got review notification message by:${addreviewData.user} and review is:${addreviewData.message}`,
                        newNotification.save();
                    resolve(updated)
                }
            })
        })
            .populate('reviews.user', { username: 1, firstName: 1 })
    })
}

//object shorthand le k vanxa vane export vitra 
//single data chahi key ani tyo vitra ko implementation  
// chahi value
module.exports = {
    find,
    getById,
    insert,
    update,
    remove,
    addReview
};

