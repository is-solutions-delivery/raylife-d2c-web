import Axios from "axios";

const { REACT_APP_LIFERAY_API = "http://localhost:8080/api/jsonws" } =
  process.env;

// eslint-disable-next-line no-undef
const _getLiferayGroupId = () => Liferay.ThemeDisplay.getSiteGroupId() | "";
// eslint-disable-next-line no-undef
const _getLiferayToken = () => Liferay.authToken | "";

const LiferayAPI = Axios.create({
  baseURL: REACT_APP_LIFERAY_API,
});

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

  const assetCategories = await _getAssetCategoriesByParentId();

  const filteredBusinessTypes = _adaptAssetCategories(assetCategories).filter(
    ({ title, description }) =>
      title.toLowerCase().match(normalizedFilter) ||
      description.toLowerCase().match(normalizedFilter)
  );

  return filteredBusinessTypes;
};

/**
 * @param {string} id - Parent category Id of asset categories
 * @returns {Promise<{
 * categoryId: string
 * titleCurrentValue: string
 * descriptionCurrentValue: string
 * parentCategoryId: string
 * }[]>}  Array of matched categories
 */
const _getAssetCategoriesByParentId = async (id = "42648") => {
  const {
    data: { categories },
  } = await LiferayAPI.get("/assetcategory/search-categories-display", {
    headers: {
      "x-csrf-token": _getLiferayToken(),
    },
    params: {
      groupIds: _getLiferayGroupId(),
      parentCategoryIds: id,
    },
  });

  return categories;
};

/**
 * @param {{
 * categoryId: string
 * titleCurrentValue: string
 * descriptionCurrentValue: string
 * parentCategoryId: string
 * }[]}  data Array of matched categories
 * @returns {{
 * id: string
 * title: string
 * description: string
 * }[]} Array of business types
 */
const _adaptAssetCategories = (data = []) =>
  data.map(({ categoryId, titleCurrentValue, descriptionCurrentValue }) => ({
    id: categoryId,
    title: titleCurrentValue,
    description: descriptionCurrentValue,
  }));

export const LiferayService = {
  getBusinessTypes,
};
