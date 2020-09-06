function ini_hzome(root_id){

  // save gene data to global variable
  gene_data = {};

  function get_mouseover(root_tip, gene_symbol){


  }

  function set_tooltip(data, root_tip, gene_symbol){

    if (data.name != undefined){

      d3.selectAll(root_tip + '_row_tip')
        .html(function(){
            var sym_name = gene_symbol + ': ' + data.name;
            var full_html = '<p>' + sym_name + '</p>' +  '<p>' +
              data.description + '</p>';
            return full_html;
        });
    }
  }


  function gene_info(root_tip, gene_info){

    var gene_symbol = gene_info.name;

    if (_.has(gene_data, gene_symbol)){
      var inst_data = gene_data[gene_symbol];
      set_tooltip(inst_data, root_tip, gene_symbol);
    } else{
      setTimeout(get_mouseover, 10, root_tip, gene_symbol);
    }

  }

  hzome = {}

  hzome.gene_info = gene_info;
  hzome.gene_data = gene_data;
  hzome.get_mouseover = get_mouseover;

  return hzome;

}
