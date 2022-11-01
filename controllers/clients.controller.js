import Client from '../models/client.js'
import { ObjectId } from 'bson'

export default class ClientsApi {

    static async getClients(req, res) {
        try {
            const Clients = await Client.find({})
            res.status(200).send(Clients)
        }
        catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async createClient(req, res) {

        try {
            const createdClient = await Client.create(req.body)
            res.status(201).send(createdClient)
        }
        catch (error) {
            res.status(400).send({ error: error.message })
        }
    }
    static async updateClient(req, res) {

        try {
            await Client.findByIdAndUpdate({ _id: ObjectId(req.params.id) }, req.body)
            const updatedClient = await Client.findById(ObjectId(req.params.id))
            updatedClient ? res.status(200).send(updatedClient) : res.status(404).send({ error: 'The id specified does not match any Client' })
        }
        catch (error) {
            res.status(400).send({ error: error.message })
        }
    }

    static async deleteClient(req, res) {

        try {
            const deletedClient = await Client.findByIdAndDelete({ _id: ObjectId(req.params.id) })
            deletedClient ? res.status(200).send({ message: 'The Client was successfully deleted' }) : res.status(404).send({ error: 'the id specified does not match any Client' })
        }
        catch (error) {
            res.status(400).send(error)
        }
    }

}