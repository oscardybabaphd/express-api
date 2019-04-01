
var exports = module.exports = {};

exports.pager = (pageData, perPageData, result) => {
    let page = pageData || 1;
    let perPage = perPageData || 10;
    let offset = (page - 1) * perPage;
    let paginatedItems = result.slice(offset).slice(0, perPage);
    let totalPages = Math.ceil(result.length / perPage);
    let pages = {};

    pages.page = Number(page);
    pages.perPage = Number(perPage);
    pages.prePage = Number(page) - 1 ? Number(page) - 1 : null;
    pages.nextPage = (totalPages > Number(page)) ? Number(page) + 1 : null;
    pages.total = result.length;
    pages.totalPages = totalPages;
    pages.data = paginatedItems;
    console.log("pre",pages.prePage);
    console.log("nxt",pages.nextPage);
    return pages;
}


