var ini_sidebar = require('./ini_sidebar');
var set_up_filters = require('../filters/set_up_filters');
var set_up_search = require('./set_up_search');
var set_up_reorder = require('./set_up_reorder');
var set_sidebar_ini_view = require('./set_sidebar_ini_view');
var make_icons = require('./make_icons');
var make_modals = require('./make_modals');
var set_up_opacity_slider = require('./set_up_opacity_slider');
var make_colorbar = require('./make_colorbar');
var underscore = require('underscore');

/* Represents sidebar with controls.
 */
module.exports = function sidebar(cgm) {

  var params = cgm.params;
  var sidebar = d3.select(params.root+' .sidebar_wrapper');

  // 禁用边栏不可见功能
  if (params.viz.is_expand){
    
    // sidebar
    //   .style('display','none');
  }

  sidebar
    .append('div')
    .classed('title_section',true);

  if (params.sidebar.title != null){
    sidebar
      .select('.title_section')
      .append('h4')
      // .style('margin-left', params.sidebar.title_margin_left+'px')
      .style('margin-left', '20px')
      .style('margin-top','5px')
      .style('margin-bottom','0px')
      .text(params.sidebar.title);
  }

  sidebar
    .append('div')
    .style('padding-right', '2px')
    .classed('about_section',true);

  if (params.sidebar.about != null){

    sidebar
      .select('.about_section')
      .append('h5')
      .classed('sidebar_text',true)
      .style('margin-left','7px')
      .style('margin-top','5px')
      .style('margin-bottom','2px')
      .style('text-align','justify')
      .html(params.sidebar.about);
  }

  sidebar
    .append('div')
    .classed('icons_section',true)
    .style('text-align', 'center');

  if (cgm.params.make_modals){
    make_modals(params);
  }


  if (params.sidebar.icons){
    make_icons(cgm, sidebar);
  }

  set_up_reorder(params, sidebar);

  set_up_search(sidebar, params);

  set_up_opacity_slider(sidebar);

  var possible_filter_names = underscore.keys(params.viz.possible_filters);

  if (possible_filter_names.indexOf('enr_score_type')>-1){
    possible_filter_names.sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
  }

  cgm.slider_functions = {};

  underscore.each(possible_filter_names, function(inst_filter){
    set_up_filters(cgm, inst_filter);
  });

  ini_sidebar(cgm);

  // when initializing the visualization using a view
  if (params.ini_view !== null) {

    set_sidebar_ini_view(params);

    params.ini_view = null;

  }
// <i class="fa fa-angle-double-up" aria-hidden="true"></i> 
  make_colorbar(cgm);
//顶部边栏收展
  sidebar.append("div")
    .classed('angle-double-container',true)
    .classed('angle-double-container-down',true)
    .style("text-align","center")
    .append('div')
    .classed('angle-double-button',true)
    .classed('list-down',true)
    .html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>').style('display','inline-block')
  $(".sidebar_wrapper").addClass("sidebar-wrapper-down")
  $(".angle-double-button").click(function(){
    var t = $(this)
    if(t.hasClass("list-down")){
      t.removeClass("list-down")
      t.addClass("list-up")
      $(".angle-double-container").hide()
      $(".angle-double-container").removeClass("angle-double-container-down")
      $(".sidebar_wrapper").animate({height:"157px"},300)
      $(".angle-double-button").html('<i class="fa fa-angle-double-up" aria-hidden="true"></i>')
      $(".angle-double-container").show()
      // 这里不得已加了个定时器 此项目应该有另一个定时或回调导致这个visible不能及时生效
      setTimeout(function(){
        d3.select(params.root+' .sidebar_wrapper').style('overflow','visible')
      },400)
      
    }else{
      d3.select(params.root+' .sidebar_wrapper').style('overflow','hidden')
      t.removeClass("list-up")
      t.addClass("list-down")
      $(".angle-double-container").hide()
      $(".sidebar_wrapper").animate({height:"0px","margin-bottom":"20px"},300)
      $(".sidebar_wrapper").animate({height:"20px","margin-bottom":"0px"},0)
      $(".angle-double-button").html('<i class="fa fa-angle-double-down" aria-hidden="true"></i>')
      setTimeout(function(){
        $(".angle-double-container").show()
        $(".angle-double-container").addClass("angle-double-container-down")
      },300)
    }
  })
  
};
