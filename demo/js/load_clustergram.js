/*
Example files
*/


make_clust('temp_matrix.json');

var about_string = '关于';

var matrix_data = {"p1":{"title":"这个是p1的标题"}}


function make_clust(inst_network){

    d3.json('json/'+inst_network, function(network_data){

      // define arguments object
      var args = {
        root: '#container-id-1',
        'network_data': network_data,
        'about':about_string,
        'row_tip_callback':row_tip_callback,
        'col_tip_callback':col_tip_callback,
        'tile_tip_callback':tile_callback,
        'dendro_callback':dendro_callback,
        'matrix_update_callback':matrix_update_callback,
        'cat_update_callback': cat_update_callback,
        'sidebar_width':150,
        'super_label_scale':0,
        'row_label_scale':0.1,
        'col_label_scale':0.5,
        'ini_expand':true,
        // 'use_sidebar':false
        // 'ini_view':{'N_row_var':20}
        // 'ini_expand':true
      };

      resize_container(args);

      d3.select(window).on('resize',function(){
        resize_container(args);
        cgm.resize_viz();
      });

      cgm = Clustergrammer(args);

      d3.select(cgm.params.root + ' .wait_message').remove();
  });

}

function matrix_update_callback(){

  if (genes_were_found[this.root]){
    enr_obj[this.root].clear_enrichr_results(false);
  }
}

function cat_update_callback(){
  console.log('callback to run after cats are updated');
}

function tile_callback(tile_data){
  var row_name = tile_data.row_name;
  var col_name = tile_data.col_name;
}
function row_tip_callback(root_tip,row_info){
  console.log(root_tip, row_info)
}

function col_tip_callback(col_data){
  console.log(col_data)
}

function dendro_callback(inst_selection){

  var inst_rc;
  var inst_data = inst_selection.__data__;

  // toggle enrichr export section
  if (inst_data.inst_rc === 'row'){
    d3.select('.enrichr_export_section')
      .style('display', 'block');
  } else {
    d3.select('.enrichr_export_section')
      .style('display', 'none');
  }

}

function resize_container(args){

  var container_width = $("#matrix_container").width();
  var screen_height = window.innerHeight - 20;

  d3.select(args.root)
    .style('width', container_width+'px')
    .style('height', screen_height+'px');
}
