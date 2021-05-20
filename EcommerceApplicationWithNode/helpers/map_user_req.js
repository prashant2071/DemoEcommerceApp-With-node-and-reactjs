module.exports = function (newUser, user) {
    if (user.username)
        newUser.username = user.username
    if (user.password)
        newUser.password = user.password
    if (user.firstName)
        newUser.firstName = user.firstName
    if (user.lastName)
        newUser.lastName = user.lastName
    if (user.email)
        newUser.email = user.email
    if (user.role)
        newUser.role = user.role
    if (user.status)
        newUser.status = user.status
    if (user.gender)
        newUser.gender = user.gender
    if (user.image)
        newUser.image = user.image
    if (user.dob)
        newUser.dob = user.dob
    if (user.country)
        newUser.country = user.country
    if (!newUser.contactDetails)
        newUser.contactDetails = {};
    if (user.mobileNumber)
        newUser.contactDetails.mobileNumber = user.mobileNumber
    if (user.homeNumber)
        newUser.contactDetails.homeNumber = user.homeNumber
    if (user.alternateAddress)
        newUser.contactDetails.alternateAddress = user.alternateAddress
    if (!newUser.address)
        newUser.address = {};
    if (user.temporaryAddress)
        newUser.address.temporaryAddress = user.temporaryAddress.split(',');
    if (user.permanentAddress)
        newUser.address.permanentAddress = user.permanentAddress;
    if(user.image)
    newUser.image=user.image;    

    return newUser;
}