import Provider from '../models/provider.js'
import { ObjectId } from 'bson';
import Client from '../models/client.js';


export default class ProvidersApi {


    static async getProviders(req, res) {
        try {
            const providers = await Provider.find({})
            res.status(200).send(providers)
        }
        catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async createProvider(req, res) {

        try {
            const createdProvider = await Provider.create(req.body)
            res.status(201).send(createdProvider)
        }
        catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
    static async updateProvider(req, res) {

        try {
            await Provider.findByIdAndUpdate({ _id: ObjectId(req.params.id) }, req.body)
            const updatedProvider = await Provider.findById(ObjectId(req.params.id))
            updatedProvider ? res.status(200).send(updatedProvider) : res.status(404).send({ error: 'The id specified does not match any provider ' })
        }
        catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async deleteProvider(req, res) {

        try {
            const deletedProvider = await Provider.findByIdAndDelete({ _id: ObjectId(req.params.id) })
            await Client.updateMany(
                { providers: { _id: req.params.id } },
                { $pull: { providers: { _id: req.params.id } } }
            )
            deletedProvider ? res.status(200).send({ message: 'The provider was successfully deleted' }) : res.status(404).send({ error: 'the id specified does not match any provider' })
        }
        catch (error) {
            res.status(400).send(error)
        }
    }
}
