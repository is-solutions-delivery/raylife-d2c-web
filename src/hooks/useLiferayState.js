import { useCallback, useEffect, useState } from "react";

export const useLiferayState = (atom) => {
  const [value, setValue] = useState(() => {
    // eslint-disable-next-line no-undef
    return Liferay.State.read(atom);
  });

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const { dispose } = Liferay.State.subscribe(atom, setValue);
    return dispose;
  }, [atom]);

  return [
    value,
    // eslint-disable-next-line no-undef
    useCallback((newValue) => Liferay.State.write(atom, newValue), [atom]),
  ];
};
