
class Test {

    constructor(app) {
        this.app = app;
    }

    async postNewTest(obj) {
        try {
            const result = await this.app.db.collection('test').insertOne(obj);
            return result;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Test;