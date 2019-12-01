var app = new Vue({
    
    el: "#formulario",

    data: {
        matricula: null,
        nome: null,
        datanasc: null,
        email: null,
        ddd: null,
        telefone: null,
        operadora: null,
        campus: null,
        curso: null
    }
});



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

/*
    Sorting functions (sort by name key)
*/
function sortByName(objectArray, startIndex, finishIndex) {
	var q;

	if (startIndex < finishIndex) {
		q = Math.floor((startIndex + finishIndex) / 2);
		
		sortByName(objectArray, startIndex, q);
		sortByName(objectArray, q+1, finishIndex);
		merge(objectArray, startIndex, q, finishIndex);
	}
}
				
function merge(A, p, q, r) {
	var n1 = q - p + 1;
	var n2 = r - q;
	var L = [],
		R = [];

	for (var i = 0; i < n1; i++) {
		L.push(A[p + i]);
	}
	for (var j = 0; j < n2; j++) {
		R.push(A[q + j + 1]);
	}
	
	j = 0;
	i = j;
	var k = p;

	while ((i != n1) && (j != n2)) {
		if (L[i].nome <= R[j].nome) {
			A[k] = L[i];
			i++;
		}
		else {
			A[k] = R[j];
			j++;
		}
		k++;
	}
	if (i == n1) {
		for (var m = j; m < n2; m++) {
			A[k] = R[m];
			k++;
		}
	}
	if (j == n2) {
		for (var m = i; m < n1; m++) {
			A[k] = L[m];
			k++;
		}
	}
}

var alunos = [];
var form = document.getElementById('formulario-alunos');

function displayList() {
    templateRow = ``;

    if (alunos.length > 0) {
        for (var i = 0; i < alunos.length; i++) {
            templateRow += `<tr>
                            <td>${alunos[i].matricula}</td>
                            <td>${alunos[i].nome}</td>
                            <td><button type="button" class="btn btn-danger" onclick="remove(${alunos[i].matricula})">Remover</button></td>
                            </tr>\n`

            document.getElementById("corpo-lista").innerHTML = templateRow;
        }
    }
    else {
        //Display nothing
        document.getElementById("corpo-lista").innerHTML = `<tr></tr>`
    }
}


form.onsubmit = function(event) {
    event.preventDefault();

    alunos.push({
        'matricula': form.matricula.value,
        'nome': form.nome.value,
        'datanasc': form.datanasc.value,
        'email': form.email.value,
        'ddd': form.ddd.value,
        'telefone': form.telefone.value,
        'operadora': form.operadora.value,
        'campus': form.campus.value
        //'curso': form.curso.value
    });

    sortByName(alunos, 0, alunos.length - 1);

    displayList();
}


function remove(num_matricula) {
    // Delete register from array
    for (var i = 0; i < alunos.length; i++) {
        if (alunos[i].matricula == num_matricula) { 
            delete alunos[i];
        }
    }
    // Remove empty spaces on array
    alunos = alunos.filter(function(element) {
        return element != null;
    });
    //Display updated list
    displayList();
}




    