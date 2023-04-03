import React, { lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  SharedLayout,
  PrivateRoute,
  RestrictedRoute,
  Loader,
} from 'components';

import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks';
import * as authOperations from 'redux/auth/authOperations';
import { selectIsLoading } from 'redux/auth/selectors';
const Home = lazy(() => import('../pages/Home/Home.jsx'));
const Favorites = lazy(() => import('../pages/Favorites/Favorites.jsx'));
const Groups = lazy(() => import('../pages/Groups/Groups.jsx'));
const RecycleBin = lazy(() => import('../pages/RecycleBin/RecycleBin.jsx'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts.jsx'));
const SignUp = lazy(() => import('../pages/SignUp/SignUp.jsx'));
const LogIn = lazy(() => import('../pages/LogIn/LogIn.jsx'));
const AddNewContact = lazy(() =>
  import('../pages/AddNewContact/AddNewContact.jsx')
);
const EditContact = lazy(() => import('../pages/EditContact/EditContact.jsx'));
const ManageGroupMember = lazy(() =>
  import('../pages/ManageGroupMember/ManageGroupMember.jsx')
);

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(authOperations.userInit());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return isRefreshing ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route
          path="contacts"
          element={<PrivateRoute redirectTo="/" component={<Contacts />} />}
        />
        <Route
          path="/create"
          element={
            <PrivateRoute redirectTo="/" component={<AddNewContact />} />
          }
        />
        <Route
          path="edit-contact/:contactId"
          element={
            <PrivateRoute redirectTo="/login" component={<EditContact />} />
          }
        />
        <Route
          path="favorites"
          element={<PrivateRoute redirectTo="/" component={<Favorites />} />}
        />
        <Route
          path="groups"
          element={<PrivateRoute redirectTo="/" component={<Groups />} />}
        />
        <Route
          path="manage-group-member/:groupName"
          element={
            <PrivateRoute
              redirectTo="/login"
              component={<ManageGroupMember />}
            />
          }
        />

        <Route
          path="recyclebin"
          element={
            <PrivateRoute redirectTo="/login" component={<RecycleBin />} />
          }
        />
        <Route
          path="login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LogIn />} />
          }
        />
        <Route
          path="register"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<SignUp />} />
          }
        />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
