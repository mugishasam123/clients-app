import express from 'express'
import ClientsApi from '../controllers/clients.controller.js'

const router=express.Router()

router.get('/',ClientsApi.getClients)
router.post('',ClientsApi.createClient)
router.patch('/:id',ClientsApi.updateClient)
router.delete('/:id',ClientsApi.deleteClient)

export default router;