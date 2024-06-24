import { Router } from 'express';

import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';

import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId', ctrlWrapper(upsertContactController));

router.patch(
  '/:contactId',
  isValidId('contactId'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

export default router;
