import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ContentWrapper,
  Main,
  Button,
} from 'shared/commonStyledComponents.jsx';
import { ContactList, Loader, AppBar } from 'components';
import {
  Section,
  ErrorMessage,
  Notification,
  FilterList,
  ListHeader,
} from 'shared';
import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilteredContacts,
  fetchContacts,
} from 'redux/contacts';
import { selectFilterByName, selectFilterByNumber } from 'redux/filters';
import { ITEM_CATEGORIES, ROUTES } from 'constants';

const Contacts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    if (!contacts) {
      dispatch(fetchContacts());
    }
  }, [contacts, dispatch]);

  const filteredContacts = useSelector(selectFilteredContacts);
  const allContacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filterByName = useSelector(selectFilterByName);
  const filterByNumber = useSelector(selectFilterByNumber);
  const isFiltered =
    (!!filterByName || !!filterByNumber) && !!allContacts.length;

  return (
    <>
      <AppBar />
      <Main>
        <Section>
          <ContentWrapper>
            {!!allContacts.length && (
              <>
                <ListHeader
                  category={ITEM_CATEGORIES.CONTACT}
                  items={allContacts}
                  handleAddNew={() => navigate(`${ROUTES.CREATE}`)}
                />
                <FilterList />
              </>
            )}
            {isLoading ? (
              <Loader />
            ) : error && isLoading === false ? (
              <ErrorMessage />
            ) : filteredContacts.length ? (
              <>
                <ContactList state={{ from: location }} />
              </>
            ) : isFiltered ? (
              <Notification
                message={
                  filterByName && filterByNumber
                    ? `No contacts found matching your search criteria for names containing '${filterByName}' and numbers containing '${filterByNumber}'.`
                    : filterByName
                    ? `No contacts found matching your search criteria for names containing "${filterByName}" `
                    : `No contacts found matching your search criteria for numbers containing  "${filterByNumber}" `
                }
              />
            ) : (
              <>
                <Notification message="Add your first contact today and discover the amazing possibilities of Phone Genie!" />
                <Button
                  type="button"
                  onClick={() => navigate(`${ROUTES.CREATE}`)}
                >
                  Add contact
                </Button>
              </>
            )}
          </ContentWrapper>
        </Section>
      </Main>
    </>
  );
};

export default Contacts;