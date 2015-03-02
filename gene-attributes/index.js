Stanza(function(stanza, params) {
  stanza.query({
    endpoint: "http://togogenome.org/sparql",
    template: "stanza.rq",
    parameters: params
  }).then(function(data) {
    var rows = data.results.bindings;

    rows.forEach(function(row) {
      row.tax_link    = "http://identifiers.org/taxonomy/" + row.taxid.value.split(":").slice(-1)[0];
      row.refseq_link = "http://identifiers.org/refseq/"   + row.refseq_label.value.split(":").slice(-1)[0];
    });

    stanza.render({
      template: "stanza.html",
      parameters: {
        gene_attributes: rows[0]
      }
    });
  });
});
