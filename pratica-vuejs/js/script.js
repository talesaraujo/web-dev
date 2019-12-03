var app = new Vue({
    
    el: "#app-section",

    data: {
        matricula: null,
        nome: null,
        datanasc: null,
        email: null,
        ddd: null,
        telefone: null,
        operadora: null,
        campus: null,
        curso: null,
        baseURL: "http://localhost:3000",
        campi: [],
        alunos: [],
        cursos: []
    },

    async created() {
        try {
            const respCampi = await axios.get(`${this.baseURL}/api/campi`);
            this.campi = respCampi.data;

            const respAlunos = await axios.get(`${this.baseURL}/api/alunos`);
            this.alunos = respAlunos.data;

            sortByName(this.campi, 0, this.campi.length-1);
            sortByName(this.alunos, 0, this.alunos.length-1);
        }
        catch (error) {
            console.log(error);
        }
        
    },

    methods: {

        createCourseList() {
            var index;

            for (var i = 0; i < this.campi.length; i++) {
                if (this.campus == this.campi[i].nome) {
                    index = i;
                }
            }
            this.cursos = this.campi[index].cursos.sort();
        },

        async inserirAluno() {
            let novoAluno = {
                "matricula": this.matricula,
                "nome": this.nome,
                "datanasc": this.datanasc,
                "email": this.email,
                "ddd": this.ddd,
                "telefone": this.telefone,
                "operadora": this.operadora,
                "campus": this.campus,
                "curso": this.curso
            }
            try {
                const response = await axios.post(`${this.baseURL}/api/alunos`, novoAluno);
                console.log(response);
            }
            catch (error) {
                console.log(error);
            }
        },

        async excluirAluno(aluno) {
            try {
                await axios.delete(`${this.baseURL}/api/alunos/${aluno.matricula}`);

                window.location.replace('index.html')
            }
            catch (error) {
                console.log(error);
            }
        }
    }
});


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
