var make_simple_rows = require('./make_simple_rows');
var d3_tip_custom = require('../tooltip/d3_tip_custom');
var underscore = require('underscore');

// current matrix can change with downsampling
module.exports = function make_matrix_rows(params, current_matrix,
  row_names='all', ds_level = -1){

  // defaults
  var y_scale = params.viz.y_scale;
  var make_tip = true;
  var row_class = 'row';

  if (ds_level >= 0){
    y_scale = params.viz.ds[ds_level].y_scale;

    // do not show tip when rows are downsampled
    make_tip = false;
    row_class = 'ds' + String(ds_level) + '_row';
  }


  if (make_tip){

    // do not remove tile_tip here
    /////////////////////////////////

    // make rows in the matrix - add key names to rows in matrix
    /////////////////////////////////////////////////////////////
    // d3-tooltip - for tiles
    var tip = d3_tip_custom()
      .attr('class', function(){
        var root_tip_selector = params.viz.root_tips.replace('.','');
        var class_string = root_tip_selector + ' d3-tip '+
                           root_tip_selector + '_tile_tip';
        return class_string;
      })
      .style('display','none')
      .style('word-break','break-word')
      .style('width','500px')
      .direction('nw')
      .offset([0, 300])
      .html(function(d){
        var tooltip_string;
        var col_data=null,row_data=null
        if (httpCache.ref!=null){
          for(var ref of httpCache.ref){
            if(ref.cid == d.col_name){
              col_data = ref
            }else if(ref.cid == d.row_name){
              row_data = ref
            }
          }
        }else{
          tooltip_string = '<p>' +'数据加载中,请稍后再试'+'</p>' 
        }
        tooltip_string = 
        `<p>行title:${row_data==null?'暂无数据':row_data.title}</p>
        <p>列title:${col_data==null?'暂无数据':col_data.title}</p>`

        return tooltip_string;
      });

  } else {
    tip = null;
  }

  // gather a subset of row data from the matrix or use all rows
  var matrix_subset = [];
  if (row_names === 'all'){
    matrix_subset = current_matrix;
  } else {
    underscore.each(current_matrix, function(inst_row){
      if (underscore.contains(row_names, inst_row.name)){
        matrix_subset.push(inst_row);
      }
    });
  }

  d3.select(params.root+ ' .clust_group')
    .selectAll('.row')
    .data(matrix_subset, function(d){return d.name;})
    .enter()
    .append('g')
    .classed(row_class, true)
    .attr('transform', function(d) {
      return 'translate(0,' + y_scale(d.row_index) + ')';
    })
    .each(function(d){
      make_simple_rows(params, d, tip, this, ds_level);
    });

  if (params.viz.ds_level === -1 && tip != null){
    d3.selectAll(params.root+' .row')
      .call(tip);
  }

};