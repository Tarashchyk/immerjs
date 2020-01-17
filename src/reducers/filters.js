import { CHANGE_FILTER } from "../constants";
import produce from "immer";

const BASE_FILTER = "all";

const filter = produce((draft = BASE_FILTER, { type, activeFilter }) => {
  switch (type) {
    case CHANGE_FILTER:
      return activeFilter;
    default:
      return draft;
  }
});

export default filter;
