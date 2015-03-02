Stanza(function(stanza, params) {
  stanza.query({
    endpoint: "http://togogenome.org/sparql",
    template: "stanza.rq",
    parameters: params
  }).done(function(data) {
    var rows = data.results.bindings;
    console.log(rows);

    rows.forEach(function(row) {
      row.sequence_length = row.sequence ? row.sequence.value.length : null;

      switch (row.fragment && row.fragment.value) {
        case 'single':
        case 'multiple':
          row.sequence_status = 'Fragment';
          break;
        default:
          row.sequence_status = 'Complete';
      }

      row.sequence_processing = (row.precursor && row.precursor.value) == '1' ? 'precursor' : null;
    });

    stanza.render({
      template: "stanza.html",
      parameters: {
        attributes: rows
      }
    });
  });
});
