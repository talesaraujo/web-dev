var render = function(template, node) {
    node.innerHTML = template;
}

var campusTemplate = `<option>Benfica</option>
                      <option>Pici</option>
                      <option>Porangabussu</option>
                      <option>Campus de Quixadá</option>
                      <option>Campus de Sobral</option>`;


render(campusTemplate, document.getElementById('selCampus'))