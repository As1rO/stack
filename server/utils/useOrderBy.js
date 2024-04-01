// useOrderBy.js

/**
 * This function enables dynamic sorting of query results.
 *
 * @param {Object} orderBy - An object containing the sorting column and direction.
 * @returns {Array} - An orderBy clause for use in Prisma queries.
 */
function useOrderBy(orderBy) {
  let orderClause = []

  if (orderBy && orderBy.column && orderBy.direction) {
    orderClause.push({
      [orderBy.column]: orderBy.direction.toLowerCase(),
    })
  }

  return orderClause
}

module.exports = useOrderBy
