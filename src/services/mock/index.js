import { BUSINESS_TYPES, PRODUCT_QUOTES, US_STATES } from "./data";

const MOCK_TIMEOUT = 200;

/**
 * @param {string} filter - Search string used to filter the results
 * @returns {Promise<{
 * id: string
 * title: string
 * description: string
 * }[]>} Filtered Array of business types
 */
const getBusinessTypes = (filter = "") =>
  new Promise((resolve) => {
    setTimeout(() => {
      if (!filter.length) resolve([]);

      const normalizedFilter = filter.toLowerCase().replace(/\\/g, "");

      const filteredBusinessTypes = BUSINESS_TYPES.filter(
        ({ title, description }) =>
          title.toLowerCase().match(normalizedFilter) ||
          description.toLowerCase().match(normalizedFilter)
      );

      resolve(filteredBusinessTypes);
    }, MOCK_TIMEOUT);
  });

/**
 * @returns {Promise<{
 * id: string
 * title: string
 * period: string
 * description: string
 * }[]>} Array of product quotes
 */
const getProductQuotes = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCT_QUOTES);
    }, MOCK_TIMEOUT);
  });

/**
 * @returns {Promise<{
 * name: string
 * abbreviation: string
 * }[]>} Array with all US states
 */
const getUSStates = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(US_STATES);
    }, MOCK_TIMEOUT);
  });

export const MockService = {
  getBusinessTypes,
  getProductQuotes,
  getUSStates,
};
