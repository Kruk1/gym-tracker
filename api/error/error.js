class MyError extends Error
{
    constructor(message = 'Something gone wrong', status = 500, authRedirect = false){
        super()
        this.status = status
        this.message = message
        this.authRedirect = authRedirect
    }
}
    
module.exports = MyError