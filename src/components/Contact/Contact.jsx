import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useModal } from 'hooks';
import {
  ConfirmationModal,
  AddContactToGroupModal,
  FavoriteButton,
  HighlightContactDetails,
  DropdownMenu,
  SelectCheckbox,
} from 'components';
import { selectRecycleBinContacts } from 'redux/recycleBin';
import { selectFilterByName, selectFilterByNumber } from 'redux/filters';
import {
  selectFavoritesContacts,
  addContactToFavorites,
  removeContactFromFavorites,
} from 'redux/favorites';
import { selectGroups } from 'redux/groups';
import { ContactEl } from './Contact.styled';
import {
  renderDropdownElement,
  checkContactInSelected,
  checkIfInRecycleBin,
  addContactToRecycleBinWithRemovalTime,
  deleteContactAndCheckError,
  removeContactFromFavoritesIfNeeded,
  isContactInFavorites,
  removeContactFromGroups,
} from 'utils';
import { CONTACT_ACTIONS, OPERATION, ROUTES } from 'constants';
import { showContactSuccess, showRecyclebinWarn } from 'utils/notifications';

export const Contact = ({
  contact,
  isMultiSelectOpen,
  selectedContacts,
  updateSelectedContacts,
}) => {
  const filterByName = useSelector(selectFilterByName);
  const filterByNumber = useSelector(selectFilterByNumber);
  const deletedContacts = useSelector(selectRecycleBinContacts);
  const favoriteContacts = useSelector(selectFavoritesContacts);
  const groups = useSelector(selectGroups);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(
    isContactInFavorites(contact, favoriteContacts)
  );
  const [isSelected, setIsSelected] = useState(false);
  const { isRemoveModalOpen, toggleRemoveModal } = useModal(OPERATION.REMOVE);
  const { isAddModalOpen, toggleAddModal } = useModal(OPERATION.ADD);

  useEffect(() => {
    setIsSelected(checkContactInSelected(selectedContacts, contact));
  }, [selectedContacts, contact]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    return isFavorite
      ? (showContactSuccess(CONTACT_ACTIONS.REMOVE_FROM_FAVORITES, contact),
        dispatch(removeContactFromFavorites(contact.id)))
      : (dispatch(addContactToFavorites(contact)),
        showContactSuccess(CONTACT_ACTIONS.ADD_TO_FAVORITES, contact));
  };

  const toggleIsSelected = () => {
    updateSelectedContacts(contact);
    setIsFavorite(!setIsSelected);
  };

  const moveContactToRecycleBin = async () => {
    if (
      !(await deleteContactAndCheckError({
        contactId: contact.id,
        dispatch,
        toggleRemoveModal,
      }))
    )
      return;
    if (checkIfInRecycleBin(contact, deletedContacts)) {
      showRecyclebinWarn(contact);
      return;
    }
    addContactToRecycleBinWithRemovalTime(contact, dispatch);
    removeContactFromFavoritesIfNeeded({ contact, isFavorite, dispatch });
    removeContactFromGroups({ contact, groups, dispatch });
    showContactSuccess(CONTACT_ACTIONS.REMOVE_TO_RECYCLE_BIN, contact);
  };

  return (
    <>
      <ContactEl>
        {isMultiSelectOpen && (
          <SelectCheckbox checked={isSelected} onChange={toggleIsSelected} />
        )}
        {!isMultiSelectOpen && (
          <Avatar
            size="30"
            textSizeRatio={2}
            name={contact.name}
            unstyled={false}
            round="50%"
          />
        )}

        <HighlightContactDetails
          contact={contact}
          filterByName={filterByName}
          filterByNumber={filterByNumber}
        />
      </ContactEl>
      <FavoriteButton checked={isFavorite} onChange={toggleFavorite} />
      <DropdownMenu
        elements={[
          {
            label: OPERATION.EDIT,
            icon: (
              <Link
                to={`${
                  ROUTES.ROOT + ROUTES.EDIT_CONTACT + ROUTES.ROOT + contact.id
                }`}
              >
                {renderDropdownElement(CONTACT_ACTIONS.EDIT, OPERATION.EDIT)}
              </Link>
            ),
          },
          {
            label: OPERATION.REMOVE,
            icon: renderDropdownElement(
              CONTACT_ACTIONS.REMOVE_TO_RECYCLE_BIN,
              OPERATION.REMOVE,
              toggleRemoveModal
            ),
          },
          {
            label: OPERATION.ADD,
            icon: renderDropdownElement(
              CONTACT_ACTIONS.ADD_TO_GROUP,
              OPERATION.ADD,
              toggleAddModal
            ),
          },
        ]}
      />
      {isRemoveModalOpen && (
        <ConfirmationModal
          isOpen={isRemoveModalOpen}
          onClose={toggleRemoveModal}
          data={contact}
          onConfirm={moveContactToRecycleBin}
          action={CONTACT_ACTIONS.REMOVE_TO_RECYCLE_BIN}
        />
      )}
      {isAddModalOpen && (
        <AddContactToGroupModal
          isOpen={isAddModalOpen}
          onClose={toggleAddModal}
          contact={contact}
        />
      )}
    </>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  isMultiSelectOpen: PropTypes.bool,
  selectedContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ).isRequired,
  updateSelectedContacts: PropTypes.func.isRequired,
};
