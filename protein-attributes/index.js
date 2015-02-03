Stanza(function(stanza, params) {
  stanza.query({
    endpoint: "http://togogenome.org/sparql",
    template: "stanza.rq",
    parameters: params
  }).done(function(rows) {
    rows.forEach(function(row) {
      row.sequence_length = row.sequence ? row.sequence.length : null;

      switch (row.fragment) {
        case 'single':
        case 'multiple':
          row.sequence_status = 'Fragment';
          break;
        default:
          row.sequence_status = 'Complete';
      }

      row.sequence_processing = row.precursor == '1' ? 'precursor' : null;
    });

    stanza.render({
      template: "stanza.html",
      parameters: {
        attributes: rows
      }
    });
  });
});
