// :Reference
// const myGetter = (state) => {}

export const getEntriesByTerm = ({ entries }) => {
  return (term = "") => {
    if (term.length === 0) return entries;

    return entries.filter((entry) =>
      entry.text.toLowerCase().includes(term.toLowerCase())
    );
  };
};

export const getEntryById = ({ entries }) => {
  return (id = "") => {
    const entry = entries.find((entry) => entry.id === id);

    if (!entry) return;

    return { ...entry };
  };
};
