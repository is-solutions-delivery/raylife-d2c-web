import Axios from "axios";

const BASE_URL = "https://demo7852368.mockable.io/liferay";

const LiferayAPI = Axios.create({
  baseURL: BASE_URL,
});

const _adaptBusinessClassResponse = (data = []) =>
  data.map(({ businessClassCode, businessType, secondaryText }) => ({
    id: businessClassCode,
    title: businessType,
    description: secondaryText,
  }));

/**
 * @param {string} filter - Search string used to filter the results
 * @returns {Promise<{
 * id: string
 * title: string
 * description: string
 * }[]>} Filtered Array of business types
 */
const getBusinessTypes = async (filter = "") => {
  if (!filter.length) return [];

  const normalizedFilter = filter.toLowerCase().replace(/\\/g, "");

  const {
    data: { items },
  } = await LiferayAPI.get("/bcc");

  const filteredBusinessTypes = _adaptBusinessClassResponse(items).filter(
    ({ title, description }) =>
      title.toLowerCase().match(normalizedFilter) ||
      description.toLowerCase().match(normalizedFilter)
  );

  return filteredBusinessTypes;
};

export const LiferayService = {
  getBusinessTypes,
};
