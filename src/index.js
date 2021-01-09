const express = require('express');
const { uuid } = require('uuidv4')

const app = express();

app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Bsucar informations do back-end
 * POST: Criar uma information no back
 * PUT/PATCH: Alterar information no back
 * DELETE: Deletar um registro no back
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query Params: Filtros e paginação
  * Route Params: Identificar recursos para atualizar e deletar
  * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON, Utilizando o HTTP POST)
  *    
  */

const projects = [];

 // O projects é um recurso
app.get('/projects', (req, res) => {

  return res.json(projects);

});

app.post('/projects', (req, res) => {

  const {title, owner} = req.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return res.json(project);
  
});

app.put('/projects/:id', (req, res) => {

  const { id } = req.params;
  const {title, owner} = req.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({error: "Id not found!"});
  };

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);

});

app.delete('/projects/:id', (req, res) => {

  const { id } = req.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return res.status(400).json({error: "Id not found!"});
  };

  projects.splice(projectIndex, 1);

  return res.status(204).send();

});

app.listen(3333, () => {
  console.log('🏁 Back end started!');
});

