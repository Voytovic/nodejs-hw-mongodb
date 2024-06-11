import { ContactsCollection } from '../db/contact.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContacts = async (contactData) => {
  const contact = new ContactsCollection(contactData);
  return await contact.save();
};

export const updateContact = async (contactId, updateData, options = {}) => {
  return await ContactsCollection.findByIdAndUpdate(contactId, updateData, {
    new: true,
    ...options,
  });
};

export const deleteContact = async (contactId) => {
  return await ContactsCollection.findByIdAndDelete(contactId);
};
