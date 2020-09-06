module.exports = function set_up_search(sidebar, params ){
  var search_container = sidebar
    .append('div')
    .classed('gene_search_container',true)
    .style('padding-left','5%')
    .style('padding-right','30px')
    .style('margin-top','10px')
    // .style('margin-bottom','10px')

  search_container
    .append('input')
    .classed('form-control',true)
    .classed('gene_search_box',true)
    .classed('sidebar_text', true)
    .attr('type','text')
    .attr('placeholder', "行搜索")
    .style('height', params.sidebar.row_search.box.height+'px')
    .style('float', 'left')
    .style('margin-top', '10px');

  search_container
    .append('div')
    .classed('gene_search_button',true)
    .style('display','inline-block')
    .style('margin-left', '5px')
    .style('vertical-align','bottom')
    // .style('float', 'left')
    .attr('data-toggle','buttons')
    .append('button')
    .classed('sidebar_text', true)
    .html('搜索')
    .attr('type','button')
    .classed('btn',true)
    .classed('btn-primary',true)
    .classed('submit_gene_button',true)
    .style('width', '100%')
    .style('font-size', '14px');
};
