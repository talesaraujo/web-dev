/*
    Helper function to render options inside selection forms
*/
var render = function(template, node) {
    node.innerHTML = template;
}

var cursosCH = ['Biblioteconomia',
                'Ciências Sociais',
                'História',
                'Letras - Alemão',
                'Letras - Espanhol',
                'Letras - Francês',
                'Letras - Inglês',
                'Letras - Italiano',
                'Letras - Português',
                'Psicologia',
                'Direito',
                'Pedagogia',
                'Arquitetura e Urbanismo',
            ];

var cursosDireito = ['Direito'];


            



var campusTemplate = `<option>Benfica</option>
                      <option>Pici</option>
                      <option>Porangabussu</option>
                      <option>Campus de Quixadá</option>
                      <option>Campus de Sobral</option>`;

var benficaCursos = `
                    
                    `





render(campusTemplate, document.querySelector('#selCampus'));