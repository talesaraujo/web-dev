/*
    Helper functions to render options inside selection forms
*/
function render(template, node) {
    node.innerHTML = template;
}

function createOptionTemplate(courseList) {
    var template = "";

    for (var i = 0; i < courseList.length; i++) {
        template += `<option>${courseList[i]}</option>\n`;
    }

    return template;
}

var campusUFC = ['Benfica', 'Pici', 'Porangabussu', 'Campus de Quixadá', 'Campus de Sobral']

var cursosBenfica = ['Biblioteconomia',
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
                     'Economia',
                     'Administração',
                     'Ciências Atuariais',
                     'Ciências Contábeis',
                     'Ciências Econômicas',
                     'Finanças',
                     'Secretariado Executivo'];

var cursosPici = ['Biotecnologia',
                  'Ciência da Computação',
                  'Ciências Biológicas',
                  'Computação',
                  'Estatística',
                  'Física',
                  'Geografia',
                  'Geologia',
                  'Matemática',
                  'Matemática Industrial',
                  'Química',
                  'Química Industrial',
                  'Agronomia',
                  'Economia Ecológica',
                  'Engenharia de Alimentos',
                  'Engenharia de Pesca',
                  'Gestão de Políticas Públicas',
                  'Zootecnia',
                  'Engenharia Civil',
                  'Engenharia de Computação',
                  'Engenharia Elétrica',
                  'Engenharia de Energias e Meio Ambiente',
                  'Engenharia Mecânica',
                  'Engenharia Metalúrgica',
                  'Engenharia de Produção Mecânica',
                  'Engenharia de Telecomunicações',
                  'Engenharia de Teleinformática',
                  'Engenharia Química',
                  'Cinema e Audiovisual',
                  'Comunicação Social - Jornalismo',
                  'Comunicação Social - Publicidade',
                  'Dança',
                  'Design - Moda',
                  'Filosofia',
                  'Gastronomia',
                  'Música',
                  'Educação Física',
                  'Sistemas e Mídias Digitais',
                  'Administração (EaD)',
                  'Física (EaD)',
                  'Letras Espanhol (EaD)',
                  'Letras Inglês (EaD)',
                  'Letras Português (EaD)',
                  'Matemática (EaD)',
                  'Química (EaD)']



render(createOptionTemplate(campusUFC), document.querySelector('#selCampus'));