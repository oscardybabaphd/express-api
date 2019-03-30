
var exports = module.exports = {};

exports.pager = (_page, _per_page, result) => {
    let page = _page || 1;
    let per_page = _per_page || 10;
    let offset = (page - 1) * per_page;
    let paginatedItems = result.slice(offset).slice(0, per_page);
    let total_pages = Math.ceil(result.length / per_page);
    let pages = {};

    pages.page = Number(page);
    pages.per_page = Number(per_page);
    pages.pre_page = Number(page) - 1 ? Number(page) - 1 : null;
    pages.next_page = (total_pages > Number(page)) ? Number(page) + 1 : null;
    pages.total = result.length;
    pages.total_pages = total_pages;
    pages.data = paginatedItems;
    console.log("pre",pages.pre_page);
    console.log("nxt",pages.next_page);
    return pages;
}


