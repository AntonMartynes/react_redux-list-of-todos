import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { actions } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const [isLoading, setIsloading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsloading(true);

    getUser(currentTodo?.userId ?? 0)
      .then(loadedUser => setUser(loadedUser))
      .catch(error => setErrorMessage(error))
      .finally(() => setIsloading(false));
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {isLoading && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            {`Todo #${currentTodo?.id}`}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(actions.removeTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

          <p className="block" data-cy="modal-user">
            {currentTodo?.completed
              ? <strong className="has-text-success">Done</strong>
              : <strong className="has-text-danger">Planned</strong>}
            {' by '}
            {user && <a href={`mailto:${user.email}`}>{user.name}</a>}
            {errorMessage && (<p>{errorMessage}</p>)}
          </p>
        </div>
      </div>
    </div>
  );
};
