import React from 'react';

type StateContextValue<T> = {
  state: T;
  update: React.Dispatch<React.SetStateAction<T>>;
};

function createStateContext<T>() {
  const Context = React.createContext<StateContextValue<T> | undefined>(
    undefined,
  );

  function useContext() {
    const contextValue = React.useContext(Context);
    if (!contextValue) {
      throw new Error('useContext must be inside a provider with a value');
    }
    return contextValue;
  }

  function StateProvider({
    children,
    defaultValue,
  }: React.PropsWithChildren<{ defaultValue: T }>) {
    const [state, update] = React.useState(defaultValue);

    return (
      <Context.Provider value={{ state, update }}>{children}</Context.Provider>
    );
  }

  return [useContext, StateProvider] as const;
}

export { createStateContext };
