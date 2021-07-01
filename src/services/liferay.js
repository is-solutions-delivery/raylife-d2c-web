import Axios from "axios";
import Cookies from "js-cookie";

const {
  REACT_APP_LIFERAY_API = "",
  REACT_APP_LIFERAY_AUTH_USERNAME = "",
  REACT_APP_LIFERAY_AUTH_PASSWORD = "",
} = process.env;

/**
 * @returns {string} Liferay Group Id
 */
const getLiferayGroupId = () => {
  try {
    // eslint-disable-next-line no-undef
    const groupId = Liferay.ThemeDisplay.getSiteGroupId();
    return groupId;
  } catch (error) {
    console.warn("Not able to find Liferay Group Id\n", error);
    return "";
  }
};

/**
 * @returns {string} Liferay Authentication Token
 */
const getLiferayAuthenticationToken = () => {
  try {
    // eslint-disable-next-line no-undef
    const token = Liferay.authToken;
    return token;
  } catch (error) {
    console.warn("Not able to find Liferay auth token\n", error);
    return "";
  }
};

const LiferayAPI = Axios.create({
  baseURL: REACT_APP_LIFERAY_API,
  auth: {
    username: REACT_APP_LIFERAY_AUTH_USERNAME,
    password: REACT_APP_LIFERAY_AUTH_PASSWORD,
  },
  headers: {
    "x-csrf-token": getLiferayAuthenticationToken(),
  },
});

/**
 * @param {string} filter - Search string used to filter the results
 * @returns {Promise<BusinessType[]>} Filtered Array of business types
 */
const getBusinessTypes = async (filter = "") => {
  if (!filter.length) return [];

  const normalizedFilter = filter.toLowerCase().replace(/\\/g, "");

  const parentId = Cookies.get("CATEGORY_PARENT_ID");

  const assetCategories = await _getAssetCategoriesByParentId(parentId);

  const filteredBusinessTypes = _adaptAssetCategories(assetCategories).filter(
    ({ title, description }) =>
      title.toLowerCase().match(normalizedFilter) ||
      description.toLowerCase().match(normalizedFilter)
  );

  return filteredBusinessTypes;
};

/**
 * @param {string} id - Parent category Id of asset categories
 * @returns {Promise<AssetCategoryResponse[]>}  Array of matched categories
 */
const _getAssetCategoriesByParentId = async (id) => {
  const {
    data: { categories },
  } = await LiferayAPI.get("/assetcategory/search-categories-display", {
    params: {
      groupIds: getLiferayGroupId(),
      parentCategoryIds: id,
      title: "",
      vocabularyIds: "",
      start: 0,
      end: 50,
    },
  });

  return categories;
};

/**
 * @param {AssetCategory[]}  data Array of matched categories
 * @returns {BusinessType[]} Array of business types
 */
const _adaptAssetCategories = (data = []) =>
  data.map(({ categoryId, titleCurrentValue, descriptionCurrentValue }) => ({
    id: categoryId,
    title: titleCurrentValue,
    description: descriptionCurrentValue,
  }));

/**
 * @param {string} categoryId - Asset Category Id
 * @returns {Promise<number>} Business Class Code
 */
const getBusinessClassCode = async (categoryId) => {
  const categoryProperties = await _getCategoryProperties(categoryId);

  const businessClassCode = categoryProperties.find(({ key }) => key === "BCC");

  return businessClassCode.value;
};

/**
 * @param {string} id - Parent category Id of asset categories
 * @returns {Promise<CategoryPropertyResponse[]>}  Array of matched categories
 */
const _getCategoryProperties = async (id) => {
  const { data } = await LiferayAPI.get(
    "/assetcategoryproperty/get-category-properties",
    {
      params: {
        entryId: id,
      },
    }
  );

  return data;
};

export const LiferayService = {
  LiferayAPI,
  getBusinessTypes,
  getLiferayAuthenticationToken,
  getLiferayGroupId,
  getBusinessClassCode,
};

/**
 * @typedef {{
 * categoryId: string
 * titleCurrentValue: string
 * descriptionCurrentValue: string
 * parentCategoryId: string
 * }} AssetCategoryResponse
 */

/**
 * @typedef {{
 * key: string
 * value: string
 * }} CategoryPropertyResponse
 */

/**
 * @typedef {{
 * id: string
 * title: string
 * description: string
 * }} BusinessType
 */
