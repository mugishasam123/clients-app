import express from 'express'
import ProvidersApi from '../controllers/providers.controller.js'

const router=express.Router()

router.get('/',ProvidersApi.getProviders)
router.post('',ProvidersApi.createProvider)
router.patch('/:id',ProvidersApi.updateProvider)
router.delete('/:id',ProvidersApi.deleteProvider)

export default router;