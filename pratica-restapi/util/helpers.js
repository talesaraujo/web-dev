
/**
 * Verifica se uma determinada data está dentro de um período de duas 
 * outras datas. Assume que o formato de entrada de data está definido
 * como a string "YYYY-MM-DD"
 */
function entrePeriodo(data, inicio, fim) {
    let data_atual = new Date(data);
    let data_inicio = new Date(inicio);
    let data_fim = new Date(fim);

    if ((data_atual >= data_inicio) && (data_atual <= data_fim)) {
        return true;
    }
    return false;
}

/**
 * Retorna um array com a lista de alunos de acordo com a consulta fornecida
 */
function geraConsulta(consulta, alunos) {
    let listaConsulta = []

    if (consulta.campus) {
        for (var i = 0; i < alunos.length; i++) {
            if (alunos[i].campus === consulta.campus) {
                listaConsulta.push(alunos[i]);
            }
        }
        return listaConsulta;
    }
    if (consulta.curso) {
        for (var i = 0; i < alunos.length; i++) {
            if (alunos[i].curso === consulta.curso) {
                listaConsulta.push(alunos[i]);
            }
        }
        return listaConsulta;
    }
    if (consulta.datainicio) {
        for (var i = 0; i < alunos.length; i++) {
            if (entrePeriodo(alunos[i].datanasc, consulta.datainicio, consulta.datafim)) {
                listaConsulta.push(alunos[i]);
            }
        }
        return listaConsulta;
    }
}


module.exports = {
    buscaAluno, obterAluno, validarAluno, removeAluno, 
    buscaCampus, validarCampus, obterCampi, removeCampus, campusAusente,
    entrePeriodo, geraConsulta
};