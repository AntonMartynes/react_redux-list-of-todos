/* eslint-disable max-len */
import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useFilteredTodos } from '../../hooks/useFilteredTodods';
import { actions } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const currentTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const visibleTodos = useFilteredTodos();

  return (
    <>
      {!visibleTodos.length && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {visibleTodos && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {visibleTodos.map(todo => (
              <tr
                key={todo.id}
                data-cy="todo"
                className={cn({ 'has-background-info-light': currentTodo?.id === todo.id })}
              >
                <td className="is-vcentered">{todo.id}</td>
                <td className="is-vcentered">
                  {todo.completed && (
                    <span className="icon" data-cy="iconCompleted"><i className="fas fa-check" /></span>
                  )}
                </td>

                <td className="is-vcentered is-expanded">
                  <p
                    className={cn(
                      { 'has-text-danger': !todo.completed },
                      { 'has-text-success': todo.completed },
                    )}
                  >
                    {todo.title}
                  </p>
                </td>

                <td className="has-text-right is-vcentered">
                  <button
                    data-cy="selectButton"
                    className="button"
                    type="button"
                    onClick={() => dispatch(actions.setTodo(todo))}
                  >
                    <span className="icon">
                      <i
                        className={cn(
                          'far',
                          { 'fa-eye': currentTodo?.id !== todo.id },
                          { 'fa-eye-slash': currentTodo?.id === todo.id },
                        )}
                      />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
