class MyError extends Error
{
    constructor(message = 'Something gone wrong', status = 500, auth = false){
        super()
        this.status = status
        this.message = message
    }
}
    
module.exports = MyError