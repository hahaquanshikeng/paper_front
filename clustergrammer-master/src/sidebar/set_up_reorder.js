// var get_cat_title = require('../categories/get_cat_title');
var underscore = require('underscore');

module.exports = function set_up_reorder(params, sidebar){

  var button_dict;
  var tmp_orders;
  var rc_dict = {'row':'Row', 'col':'Column', 'both':''};
  var is_active;
  var inst_reorder;
  // 自定义附加功能容器
  var func_container = sidebar.append('div')
  .style('width', '100%')
  .style('padding-right', '30px')
  .style('height', '34px')
  .style('margin-bottom', '10px')
  // 原始矩阵
  func_container.append('button')
  .attr('type','button')
  .style('float', 'left')
  .style('width', '20%')
  .style('margin-left', '5%')
  .classed('btn',true)
  .classed('btn-primary',true)
  .classed('sidebar_button_text',true)
  .html("原始矩阵");
  //参考扩展
  func_container.append('button')
  .attr('type','button')
  .style('float', 'left')
  .style('width', '20%')
  .style('margin-left', '5%')
  .classed('btn',true)
  .classed('btn-primary',true)
  .classed('sidebar_button_text',true)
  .html("参考扩展");
  //引用补充
  func_container.append('button')
  .attr('type','button')
  .style('float', 'left')
  .style('width', '20%')
  .style('margin-left', '5%')
  .classed('btn',true)
  .classed('btn-primary',true)
  .classed('sidebar_button_text',true)
  .html("引用补充");
  //自动迭代
  func_container.append('button')
  .attr('type','button')
  .style('float', 'left')
  .style('width', '20%')
  .style('margin-left', '5%')
  .classed('btn',true)
  .classed('btn-primary',true)
  .classed('sidebar_button_text',true)
  .html("自动迭代");

  var reorder_section = sidebar
    .append('div')
    .style('padding-right', '30px')
    .classed('reorder_section', true);
  // 求和与聚类是否分行列
  // params.sim_mat=true
  var reorder_types;
  if (params.sim_mat){
    reorder_types = ['both'];
  } else {
    reorder_types = ['row','col'];
  }


  underscore.each(reorder_types, function(inst_rc){

    button_dict = {
      'clust':'聚类排序',
      'rank':'求和排序',
      'rankvar':'Rank by Variance',
      'ini':'Initial Order',
      'alpha':'Alphabetically'
    };

    var other_rc;
    if (inst_rc === 'row'){
      other_rc = 'col';
      button_dict.clust="行聚类排序"
      button_dict.rank="行求和排序"
    } else if(inst_rc === 'col') {
      other_rc = 'row';
      button_dict.clust="列聚类排序"
      button_dict.rank="列求和排序"
    } else {
      other_rc = 'row'
      button_dict.clust="聚类排序"
      button_dict.rank="求和排序"
    }

    tmp_orders = Object.keys(params.matrix.orders);

    var possible_orders = [];

    underscore.each(tmp_orders, function(inst_name){

      if (inst_name.indexOf(other_rc) > -1){
        inst_name = inst_name.replace('_row','').replace('_col','');

        if ( inst_name.indexOf('cat_') < 0 ){
          possible_orders.push(inst_name);
        }
      }

    });

    //仅保留求和排序与聚类排序
    possible_orders = ['clust','rank']

    // possible_orders = underscore.uniq(possible_orders);

    // possible_orders = possible_orders.sort();

    var reorder_text;
    if (inst_rc !='both'){
      reorder_text = ' Order';
    } else {
      reorder_text = 'Reorder Matrix';
    }

    // reorder_section
    //   .append('div')
    //   .classed('sidebar_button_text',true)
    //   .style('clear','both')
    //   .style('margin-top','10px')
    //   .html(rc_dict[inst_rc]+reorder_text);


    inst_reorder = reorder_section
      .append('div')
      .classed('btn-group-vertical',true)
      .style('width', '50%')
      .classed('toggle_'+inst_rc+'_order',true)
      .attr('role','group');

    inst_reorder
      .selectAll('.button')
      .data(possible_orders)
      .enter()
      .append('button')
      .attr('type','button')
      .style('float', 'left')
      .style('width', '40%')
      .style('margin-left', '10%')
      .classed('btn',true)
      .classed('btn-primary',true)
      .classed('sidebar_button_text',true)
      .classed('active', function(d){
        is_active = false;
        if (d == params.viz.inst_order[other_rc]){
          is_active = true;
        }
        return is_active;
      })
      .attr('name', function(d){
        return d;
      })
      .html(function(d){
        return button_dict[d];
      });

  });

};
