// useGenericFilters.js

/**
 * Generates a dynamic Prisma `where` clause based on a generic filter object.
 * This function assumes that filter keys match the database model's properties.
 *
 * @param {Object} filters - An object containing the filter criteria.
 * @returns {Object} - A `where` clause for use in Prisma findMany or similar queries.
 */
function useFilters(filters) {
  let whereClause = {}

  if (!filters) {
    return whereClause
  }

  Object.keys(filters).forEach((key) => {
    const filterValue = filters[key]

    // If the filter value is an object, assume it's specifying a comparison operation (e.g., gte, lte).
    if (typeof filterValue === 'object' && filterValue !== null) {
      whereClause[key] = {}

      Object.keys(filterValue).forEach((operation) => {
        whereClause[key][operation] = filterValue[operation]
      })
    } else {
      // For simple equality checks, use the filter value directly.
      whereClause[key] = { equals: filterValue }
    }
  })

  return whereClause
}

module.exports = useFilters
