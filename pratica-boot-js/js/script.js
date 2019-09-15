
var CAMPI = {
    "Benfica": ['Biblioteconomia',
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
                'Secretariado Executivo'],

    "Pici": ['Biotecnologia',
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
             'Sistemas e Mídias Digitais'],

    "Porangabussu": ['Enfermagem',
                     'Farmácia', 
                     'Odontologia',
                     'Fisioterapia',
                     'Medicina']
}


/*
    Helper functions to render options inside selection forms
*/
function populate(select1, select2) {
    var s1 = document.getElementById(select1),
        s2 = document.getElementById(select2);

    s2.innerHTML = "";

    if (s1.value == "Benfica") {
        var cursos = CAMPI.Benfica;
    }
    else if (s1.value == "Pici") {
        var cursos = CAMPI.Pici;
    }
    else if (s1.value == "Porangabussu") {
        var cursos = CAMPI.Porangabussu;
    }
    else {
        var cursos = ["Por favor selecione o campus"];
    }

    for (var i = 0; i < cursos.length; i++) {
        var newOption = document.createElement("option");
        newOption.innerHTML = cursos[i];
        s2.options.add(newOption);
    }
}